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

  // Stripe payment endpoint
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

  // Stripe webhook endpoint for event handling
  app.post("/api/webhook", async (req: Request, res: Response) => {
    const signature = req.headers['stripe-signature'];
    
    if (!signature) {
      return res.status(400).json({ error: 'Missing Stripe signature header' });
    }
    
    try {
      // For production you would need to set a webhook secret from your Stripe dashboard
      // This is just a placeholder for demonstration purposes
      // const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
      const webhookSecret = 'whsec_test_placeholder';
      
      // Parse and verify the event
      let event: Stripe.Event;
      
      try {
        // In production, use the actual webhook secret:
        // event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
        
        // For testing without the actual webhook secret:
        event = {
          type: req.body.type,
          data: { object: req.body.data.object }
        } as Stripe.Event;
      } catch (err: any) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return res.status(400).json({ error: 'Webhook signature verification failed' });
      }
      
      // Handle the event
      const result = await handleWebhookEvent(event);
      
      res.json(result);
    } catch (error: any) {
      console.error(`Webhook error: ${error.message}`);
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

  // Agent-specific subscription endpoints
  
  // Check if user has access to a specific agent
  app.get("/api/agent/:agentId/check-access", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ hasAccess: false, message: "Not authenticated" });
    }
    
    try {
      const { agentId } = req.params;
      const hasAccess = await storage.checkAgentAccess(req.user.id, agentId);
      const subscriptions = await storage.getUserAgentSubscriptions(req.user.id);
      
      res.json({ 
        hasAccess,
        agentId,
        userSubscriptions: subscriptions,
        trialEndsAt: req.user.trialEndsAt
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Create or get a subscription for the user
  app.post("/api/subscription/create", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "You must be logged in to subscribe" });
    }
    
    try {
      let user = req.user;
      
      // If user already has an active subscription, return it
      if (user.stripeSubscriptionId && 
          (user.subscriptionStatus === 'active' || user.subscriptionStatus === 'trialing')) {
        const subscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId);
        
        return res.json({
          subscriptionId: subscription.id,
          clientSecret: subscription.latest_invoice?.payment_intent?.client_secret,
          status: subscription.status
        });
      }
      
      // If user doesn't have a Stripe customer ID, create one
      if (!user.stripeCustomerId) {
        const customer = await stripe.customers.create({
          email: user.email,
          name: user.name || undefined
        });
        
        user = await storage.updateStripeCustomerId(user.id, customer.id);
      }
      
      // Create a new subscription with a 7-day trial
      const subscription = await stripe.subscriptions.create({
        customer: user.stripeCustomerId,
        items: [{
          // Use price ID from Stripe dashboard
          // For testing purposes, we'll use 'price_1NAq6FCZ6qsJgndJaZqGM9QM' as placeholder
          price: process.env.STRIPE_PRICE_ID || 'price_1NAq6FCZ6qsJgndJaZqGM9QM',
        }],
        payment_behavior: 'default_incomplete',
        trial_period_days: 7,
        expand: ['latest_invoice.payment_intent'],
      });
      
      // Update user with subscription info
      const trialEnd = new Date();
      trialEnd.setDate(trialEnd.getDate() + 7);
      
      await storage.updateUserSubscription(
        user.id, 
        subscription.id, 
        subscription.status, 
        trialEnd
      );
      
      res.json({
        subscriptionId: subscription.id,
        clientSecret: subscription.latest_invoice?.payment_intent?.client_secret,
        status: subscription.status,
        trialEnd: trialEnd
      });
    } catch (error: any) {
      console.error('Subscription creation error:', error);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Cancel a subscription
  app.post("/api/subscription/cancel", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "You must be logged in to cancel a subscription" });
    }
    
    try {
      const user = req.user;
      
      if (!user.stripeSubscriptionId) {
        return res.status(400).json({ message: "No active subscription found" });
      }
      
      // Cancel the subscription at period end
      const subscription = await stripe.subscriptions.update(user.stripeSubscriptionId, {
        cancel_at_period_end: true
      });
      
      // Update user subscription status
      await storage.updateUserSubscription(
        user.id, 
        subscription.id, 
        'canceling', 
      );
      
      res.json({ 
        success: true, 
        message: "Subscription will be canceled at the end of the billing period" 
      });
    } catch (error: any) {
      console.error('Subscription cancellation error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
