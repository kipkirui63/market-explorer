import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { createPaymentIntent, createInvoice, handleWebhookEvent } from "./stripe";
import Stripe from "stripe";

// Initialize Stripe with the secret key for webhook validation
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function registerRoutes(app: Express): Promise<Server> {
  // sets up /api/register, /api/login, /api/logout, /api/user
  setupAuth(app);

  // Create subscription with 7-day free trial
  app.post("/api/create-subscription", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "You must be logged in to subscribe" });
    }

    try {
      const user = req.user;
      
      // Check if user already has a subscription
      if (user.stripeSubscriptionId) {
        return res.status(400).json({ message: "User already has a subscription" });
      }

      // Create or get Stripe customer
      let customerId = user.stripeCustomerId;
      if (!customerId) {
        const customer = await stripe.customers.create({
          email: user.email,
          name: user.name || user.email,
        });
        customerId = customer.id;
        await storage.updateStripeCustomerId(user.id, customerId);
      }

      // Create subscription with 7-day trial
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'CrispAI Premium Access',
              description: 'Access to all AI agents and tools'
            },
            unit_amount: 2900, // $29.00 per month
            recurring: {
              interval: 'month'
            }
          }
        }],
        trial_period_days: 7,
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
      });

      // Update user with subscription info
      const trialEndsAt = new Date();
      trialEndsAt.setDate(trialEndsAt.getDate() + 7);
      
      await storage.updateUserSubscription(
        user.id, 
        subscription.id, 
        'trialing', 
        trialEndsAt
      );

      res.json({
        subscriptionId: subscription.id,
        clientSecret: subscription.latest_invoice?.payment_intent?.client_secret,
        status: subscription.status,
        trialEnd: subscription.trial_end
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Check subscription access
  app.get("/api/subscription-access", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "You must be logged in" });
    }

    try {
      const hasAccess = await storage.checkUserSubscriptionAccess(req.user.id);
      const user = await storage.getUser(req.user.id);
      
      res.json({
        hasAccess,
        subscriptionStatus: user?.subscriptionStatus || 'inactive',
        trialEndsAt: user?.trialEndsAt
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Stripe payment endpoint (for one-time purchases)
  app.post("/api/create-payment-intent", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "You must be logged in to checkout" });
    }

    try {
      const { amount, cartItems } = req.body;
      const result = await createPaymentIntent(amount, { 
        userId: req.user.id.toString(),
        cartItems: JSON.stringify(cartItems)
      });
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Generate invoice on successful payment
  app.post("/api/create-invoice", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "You must be logged in to generate an invoice" });
    }

    try {
      const { cartItems, amount, paymentIntentId } = req.body;
      
      // Create the invoice in Stripe
      const invoice = await createInvoice(req.user, cartItems, amount);
      
      // Create an order record in our system
      const order = await storage.createOrder({
        userId: req.user.id,
        stripeInvoiceId: invoice.id,
        stripePaymentIntentId: paymentIntentId,
        amount: Math.round(amount * 100), // Store in cents
        status: 'completed',
        items: JSON.stringify(cartItems)
      });
      
      res.json({ 
        success: true, 
        invoiceId: invoice.id,
        orderId: order.id,
        invoiceUrl: invoice.hosted_invoice_url
      });
    } catch (error: any) {
      console.error("Invoice creation error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Stripe webhook endpoint for subscription events
  app.post("/api/webhook", async (req: Request, res: Response) => {
    const signature = req.headers['stripe-signature'];
    
    if (!signature) {
      return res.status(400).json({ error: 'Missing Stripe signature header' });
    }
    
    try {
      // Parse the webhook event
      const event = JSON.parse(req.body);
      
      // Handle subscription events
      switch (event.type) {
        case 'customer.subscription.created':
        case 'customer.subscription.updated':
          const subscription = event.data.object;
          const customerId = subscription.customer;
          
          // Find user by Stripe customer ID
          const users = await storage.getUserByEmail(''); // We need to add a method to find by customer ID
          // For now, we'll handle this in the subscription creation endpoint
          break;
          
        case 'customer.subscription.deleted':
          const deletedSubscription = event.data.object;
          // Handle subscription cancellation
          break;
          
        case 'invoice.payment_succeeded':
          const invoice = event.data.object;
          if (invoice.subscription) {
            // Handle successful subscription payment
            console.log('Subscription payment succeeded:', invoice.id);
          }
          break;
          
        case 'invoice.payment_failed':
          const failedInvoice = event.data.object;
          if (failedInvoice.subscription) {
            // Handle failed subscription payment
            console.log('Subscription payment failed:', failedInvoice.id);
          }
          break;
      }
      
      res.json({ received: true });
    } catch (error: any) {
      console.error('Webhook error:', error);
      res.status(400).json({ error: error.message });
    }
  });

  // Protected route for AI agents - requires subscription
  app.get("/api/agent-access/:agentId", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "You must be logged in to access AI agents" });
    }

    try {
      const hasAccess = await storage.checkUserSubscriptionAccess(req.user.id);
      
      if (!hasAccess) {
        return res.status(403).json({ 
          message: "Subscription required to access AI agents", 
          needsSubscription: true 
        });
      }

      res.json({ 
        hasAccess: true, 
        agentId: req.params.agentId,
        message: "Access granted to AI agent"
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Endpoint to get user's order history
  app.get("/api/orders", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "You must be logged in to view orders" });
    }
    
    try {
      const orders = await storage.getOrdersByUser(req.user.id);
      res.json(orders);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
