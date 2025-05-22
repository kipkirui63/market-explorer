import Stripe from "stripe";

// Initialize Stripe with the secret key
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function createPaymentIntent(amount: number, metadata: any = {}) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: "usd",
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    
    return { clientSecret: paymentIntent.client_secret };
  } catch (error: any) {
    throw new Error(`Error creating payment intent: ${error.message}`);
  }
}