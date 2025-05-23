import { loadStripe } from '@stripe/stripe-js';
import type { Stripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component's render
// to avoid recreating the Stripe object on every render.
let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
      console.error('Missing VITE_STRIPE_PUBLIC_KEY');
      return null;
    }
    stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
  }
  return stripePromise;
};

export interface StripeInvoice {
  id: string;
  number: string;
  status: string;
  amount_due: number;
  amount_paid: number;
  hosted_invoice_url: string | null;
  invoice_pdf: string | null;
  created: number;
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount / 100);
};

export const formatDate = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};