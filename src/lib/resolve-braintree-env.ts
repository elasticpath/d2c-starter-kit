export const BRAINTREE_AUTH_KEY = braintreeEnv();

function braintreeEnv(): string {
  const braintreeAuthKey = process.env.NEXT_PUBLIC_BRAINTREE_KEY;
  if (!braintreeAuthKey) {
    throw new Error(
      `Failed to get braintree auth key environment variables braintreeAuthKey id: ${braintreeAuthKey}\n Make sure you have set NEXT_PUBLIC_BRAINTREE_KEY`
    );
  }
  return braintreeAuthKey;
}
