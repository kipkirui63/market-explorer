import Stripe from "stripe";
import { User } from "@shared/schema";

// Initialize Stripe with the secret key
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
}

/**
 * Creates or retrieves a Stripe customer for the user
 */
export async function getOrCreateCustomer(user: User) {
  try {
    if (user.stripeCustomerId) {
      // Retrieve existing customer
      const customer = await stripe.customers.retrieve(user.stripeCustomerId);
      if (!customer.deleted) {
        return customer;
      }
    }

    // Create a new customer
    const customer = await stripe.customers.create({
      name: user.username,
      email: user.email || `${user.username}@example.com`,
      metadata: {
        userId: user.id.toString()
      }
    });

    console.log(`Created new Stripe customer for user ${user.username}`);
    return customer;
  } catch (error: any) {
    console.error("Error in getOrCreateCustomer:", error);
    throw new Error(`Failed to create/retrieve Stripe customer: ${error.message}`);
  }
}

/**
 * Creates a payment intent and an invoice for the order
 */
export async function createPaymentIntent(amount: number, metadata: any = {}) {
  try {
    // Make sure amount is not too small (Stripe requires minimum of 50 cents)
    const amountInCents = Math.max(50, Math.round(amount * 100)); // Convert to cents with minimum
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      metadata,
      automatic_payment_methods: {
        enabled: true,
      }
    });
    
    console.log(`Created payment intent for $${amount} (${amountInCents} cents)`);
    return { clientSecret: paymentIntent.client_secret };
  } catch (error: any) {
    console.error("Stripe error:", error);
    throw new Error(`Error creating payment intent: ${error.message}`);
  }
}

/**
 * Creates an invoice for the completed order
 */
export async function createInvoice(user: User, cartItems: CartItem[], amount: number) {
  try {
    // Ensure we have a customer
    const customer = await getOrCreateCustomer(user);
    
    // Create an invoice item for each cart item
    const invoiceItems = [];
    
    for (const item of cartItems) {
      const invoiceItem = await stripe.invoiceItems.create({
        customer: customer.id,
        amount: Math.round(parseFloat(item.price) * item.quantity * 100),
        currency: 'usd',
        description: `${item.name} x ${item.quantity}`,
      });
      
      invoiceItems.push(invoiceItem);
    }
    
    // Create the invoice
    const invoice = await stripe.invoices.create({
      customer: customer.id,
      auto_advance: true, // automatically finalize the invoice
      collection_method: 'charge_automatically',
      description: `CrispAI Marketplace Purchase - ${new Date().toLocaleDateString()}`,
      metadata: {
        userId: user.id.toString(),
        items: JSON.stringify(cartItems.map(item => ({ id: item.id, name: item.name, quantity: item.quantity })))
      }
    });
    
    if (!invoice.id) {
      throw new Error('Failed to create invoice: No invoice ID returned');
    }
    
    // Finalize the invoice
    const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id);
    
    if (!finalizedInvoice.id) {
      throw new Error('Failed to finalize invoice: No invoice ID returned');
    }
    
    // Pay the invoice (this will use the payment method from the payment intent)
    const paidInvoice = await stripe.invoices.pay(finalizedInvoice.id);
    
    console.log(`Created and paid invoice ${paidInvoice.id} for customer ${customer.id}`);
    return paidInvoice;
  } catch (error: any) {
    console.error("Error creating invoice:", error);
    throw new Error(`Failed to create invoice: ${error.message}`);
  }
}

/**
 * Process a Stripe webhook event
 */
export async function handleWebhookEvent(event: Stripe.Event) {
  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`PaymentIntent ${paymentIntent.id} succeeded`);
        // Handle successful payment - could update order status, send confirmation email, etc.
        break;
        
      case 'invoice.paid':
        const invoice = event.data.object as Stripe.Invoice;
        console.log(`Invoice ${invoice.id} was paid`);
        // Handle paid invoice - could update user's subscription status, etc.
        break;
        
      case 'invoice.payment_failed':
        const failedInvoice = event.data.object as Stripe.Invoice;
        console.log(`Invoice ${failedInvoice.id} payment failed`);
        // Handle failed payment - could notify user, update status, retry, etc.
        break;
        
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
    
    return { received: true };
  } catch (error: any) {
    console.error(`Webhook error: ${error.message}`);
    throw new Error(`Webhook processing failed: ${error.message}`);
  }
}