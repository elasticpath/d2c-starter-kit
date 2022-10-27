export const STRIPE_PUBLISHABLE_KEY = stripeEnv();

function stripeEnv(): string {
  const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!stripePublishableKey) {
    throw new Error(
      `Failed to get stripe instance with stripePublishableKey: ${stripePublishableKey}\n Make sure you have set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
    );
  }
  return stripePublishableKey;
}
