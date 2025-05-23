import Stripe from "stripe";
import { User } from "@shared/schema";
import { storage } from "./storage";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

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
  if (user.stripeCustomerId) {
    return await stripe.customers.retrieve(user.stripeCustomerId);
  }

  // Create a new customer
  const customer = await stripe.customers.create({
    email: user.email || undefined,
    name: user.username,
    metadata: {
      userId: user.id.toString(),
    },
  });

  // Update the user with the new customer ID
  await storage.updateStripeCustomerId(user.id, customer.id);

  return customer;
}

/**
 * Creates a payment intent and an invoice for the order
 */
export async function createPaymentIntent(amount: number, metadata: any = {}) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Convert to cents
    currency: "usd",
    metadata,
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return paymentIntent;
}

/**
 * Creates an invoice for the completed order
 */
export async function createInvoice(user: User, cartItems: CartItem[], amount: number) {
  // Get or create the Stripe customer
  const customer = await getOrCreateCustomer(user);

  // Create an invoice item for each cart item
  for (const item of cartItems) {
    await stripe.invoiceItems.create({
      customer: customer.id,
      description: `${item.name} x ${item.quantity || 1}`,
      amount: Math.round(parseFloat(item.price) * (item.quantity || 1) * 100),
      currency: 'usd',
    });
  }

  // Create and finalize the invoice
  const invoice = await stripe.invoices.create({
    customer: customer.id,
    auto_advance: true,
    collection_method: 'charge_automatically',
    description: 'CrispAI Solutions Purchase',
  });

  // Finalize the invoice immediately
  const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id);

  // Pay the invoice (mark as paid since we already collected payment via PaymentIntent)
  const paidInvoice = await stripe.invoices.pay(finalizedInvoice.id, {
    paid_out_of_band: true,
  });

  return paidInvoice;
}

/**
 * Process a Stripe webhook event
 */
export async function handleWebhookEvent(event: Stripe.Event) {
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(`PaymentIntent ${paymentIntent.id} succeeded`);
      
      // Update order status if we have an order ID in the metadata
      if (paymentIntent.metadata?.orderId) {
        const orderId = parseInt(paymentIntent.metadata.orderId);
        await storage.updateOrderStatus(orderId, 'completed');
      }
      break;
      
    case 'invoice.paid':
      const invoice = event.data.object as Stripe.Invoice;
      console.log(`Invoice ${invoice.id} was paid`);
      break;
      
    case 'invoice.payment_failed':
      const failedInvoice = event.data.object as Stripe.Invoice;
      console.log(`Invoice ${failedInvoice.id} payment failed`);
      break;
      
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
}