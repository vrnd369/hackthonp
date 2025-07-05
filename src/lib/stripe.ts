import { loadStripe } from "@stripe/stripe-js";

console.log("Stripe key from env:", process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

// Get the Stripe publishable key from environment variables
const stripePublishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  console.warn("Stripe key is missing! Please set REACT_APP_STRIPE_PUBLISHABLE_KEY in your .env file.");
}

// Initialize Stripe (export a promise for use in components)
export const stripePromise = loadStripe(stripePublishableKey || "");

export interface PaymentData {
  amount: number;
  currency: string;
  description: string;
  metadata: {
    registration_id: string;
    participant_name: string;
    participant_email: string;
  };
}
