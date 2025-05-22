import Stripe from "stripe";

// Initialize Stripe with the secret key
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
      },
      // Include test payment method if in development
      payment_method: process.env.NODE_ENV !== 'production' ? 'pm_card_visa' : undefined,
      confirm: process.env.NODE_ENV !== 'production',
    });
    
    console.log(`Created payment intent for $${amount} (${amountInCents} cents)`);
    return { clientSecret: paymentIntent.client_secret };
  } catch (error: any) {
    console.error("Stripe error:", error);
    throw new Error(`Error creating payment intent: ${error.message}`);
  }
}