export const config = {
  clientId:
    process.env.REACT_APP_CLIENT_ID ||
    "pJV1hq0eqQJU3uxTEd8Yf5T9opDmRP8SdOBM25Ovoe",
  clientSecret:
    process.env.REACT_APP_CLIENT_SECRET ||
    "wabAIyatl4hm4ipG9RCRqBHtFNBk3yQObfq5cRuVVu",
  stripeClientSecret:
    process.env.REACT_APP_STRIPE_CLIENT_SECRET ||
    "sk_test_51IF76bEYBLZCay1Q472t4mfSTBStMTqj8OcbLArfJgOsA8TpFxDgCI620NvL0S0TGyQXmlIdQ7rQj2CrsbI1VGRK00p4Q2Vif3",
  stripeKey:
    process.env.REACT_APP_STRIPE_KEY ||
    "pk_test_51IF76bEYBLZCay1QYy6zYdlG152TyC7cWY2V9101fi3ECcd8qoTPVBjW0EOb2VmgKPCuwWBBogvjQAjNHotH3Gjk00BYsM1fux",
  endpointURL: process.env.REACT_APP_ENDPOINT_URL || "api.moltin.com",
};
