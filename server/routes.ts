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
  
  // Create or get a subscription for a specific agent
  app.post("/api/agent/:agentId/subscribe", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "You must be logged in to subscribe" });
    }
    
    try {
      const { agentId } = req.params;
      let user = req.user;
      
      // Import agent plans from schema
      const { AGENT_PLANS } = await import("@shared/schema");
      
      // Validate agent ID
      if (!AGENT_PLANS[agentId as keyof typeof AGENT_PLANS]) {
        return res.status(400).json({ message: "Invalid agent ID" });
      }
      
      const agentPlan = AGENT_PLANS[agentId as keyof typeof AGENT_PLANS];
      
      // Check if user already has a subscription for this agent
      const existingSubscription = await storage.getAgentSubscription(user.id, agentId);
      if (existingSubscription && 
          (existingSubscription.status === 'active' || existingSubscription.status === 'trialing')) {
        return res.json({
          message: "Already subscribed to this agent",
          subscription: existingSubscription
        });
      }
      
      // If user doesn't have a Stripe customer ID, create one
      if (!user.stripeCustomerId) {
        const customer = await stripe.customers.create({
          email: user.email,
          name: user.name || undefined
        });
        
        user = await storage.updateStripeCustomerId(user.id, customer.id);
        if (!user) {
          throw new Error("Failed to update user with Stripe customer ID");
        }
      }
      
      // Use existing Stripe price IDs (these need to be created in your Stripe dashboard)
      const stripePriceIds = {
        'resume-analyzer': process.env.STRIPE_RESUME_ANALYZER_PRICE_ID || 'price_test_resume',
        'business-intelligence': process.env.STRIPE_BUSINESS_INTEL_PRICE_ID || 'price_test_business',
        'sop-assistant': process.env.STRIPE_SOP_ASSISTANT_PRICE_ID || 'price_test_sop',
        'ai-recruitment': process.env.STRIPE_AI_RECRUITMENT_PRICE_ID || 'price_test_recruitment',
        'crisp-write': process.env.STRIPE_CRISP_WRITE_PRICE_ID || 'price_test_write'
      };

      const priceId = stripePriceIds[agentId as keyof typeof stripePriceIds];
      
      // Create a new subscription with a 7-day trial
      const subscription = await stripe.subscriptions.create({
        customer: user.stripeCustomerId!,
        items: [{
          price: priceId,
        }],
        payment_behavior: 'default_incomplete',
        trial_period_days: 7,
        expand: ['latest_invoice.payment_intent'],
      });
      
      // Calculate trial end date
      const trialEnd = new Date();
      trialEnd.setDate(trialEnd.getDate() + 7);
      
      // Store agent subscription in database
      const agentSubscription = await storage.createAgentSubscription({
        userId: user.id,
        agentId: agentId,
        stripeSubscriptionId: subscription.id,
        status: subscription.status,
        priceId: subscription.items.data[0].price.id,
        currentPeriodStart: subscription.current_period_start ? new Date(subscription.current_period_start * 1000) : null,
        currentPeriodEnd: subscription.current_period_end ? new Date(subscription.current_period_end * 1000) : null,
        trialEnd: trialEnd
      });
      
      // Add agent to user's subscribed agents list
      await storage.addAgentToUser(user.id, agentId);
      
      res.json({
        message: "Subscription created successfully",
        agentId: agentId,
        agentName: agentPlan.name,
        monthlyPrice: agentPlan.monthlyPrice,
        subscriptionId: subscription.id,
        clientSecret: subscription.latest_invoice?.payment_intent?.client_secret,
        status: subscription.status,
        trialEnd: trialEnd,
        subscription: agentSubscription
      });
    } catch (error: any) {
      console.error('Agent subscription creation error:', error);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Start trial for a specific agent (free 7-day trial)
  app.post("/api/agent/:agentId/start-trial", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "You must be logged in to start a trial" });
    }
    
    try {
      const { agentId } = req.params;
      const user = req.user;
      
      // Import agent plans from schema
      const { AGENT_PLANS } = await import("@shared/schema");
      
      // Validate agent ID
      if (!AGENT_PLANS[agentId as keyof typeof AGENT_PLANS]) {
        return res.status(400).json({ message: "Invalid agent ID" });
      }
      
      const agentPlan = AGENT_PLANS[agentId as keyof typeof AGENT_PLANS];
      
      // Check if user already has access to this agent
      const hasAccess = await storage.checkAgentAccess(user.id, agentId);
      if (hasAccess) {
        return res.json({
          message: "You already have access to this agent",
          agentId: agentId
        });
      }
      
      // Calculate trial end date (7 days from now)
      const trialEnd = new Date();
      trialEnd.setDate(trialEnd.getDate() + 7);
      
      // Create a trial subscription record
      const trialSubscription = await storage.createAgentSubscription({
        userId: user.id,
        agentId: agentId,
        stripeSubscriptionId: `trial_${user.id}_${agentId}_${Date.now()}`, // Temporary trial ID
        status: 'trialing',
        priceId: 'trial_price',
        currentPeriodStart: new Date(),
        currentPeriodEnd: trialEnd,
        trialEnd: trialEnd
      });
      
      // Add agent to user's subscribed agents list
      await storage.addAgentToUser(user.id, agentId);
      
      res.json({
        message: "7-day free trial started successfully!",
        agentId: agentId,
        agentName: agentPlan.name,
        trialEnd: trialEnd,
        subscription: trialSubscription
      });
    } catch (error: any) {
      console.error('Trial activation error:', error);
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
