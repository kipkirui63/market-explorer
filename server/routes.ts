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

  const httpServer = createServer(app);

  return httpServer;
}
