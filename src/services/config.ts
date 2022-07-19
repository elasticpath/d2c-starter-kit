export const config = {
  clientId:
    process.env.REACT_APP_CLIENT_ID ||
    "VFxwjp79necDvAHWTEiGC6dqN11cjYarcUePsmjaMS",
  clientSecret:
    process.env.REACT_APP_CLIENT_SECRET ||
    "PeyRvlAS7Gg3KRSmLaFAylibKry9lGWIRgZOpTVK3D",
  stripeClientSecret:
    process.env.REACT_APP_STRIPE_CLIENT_SECRET ||
    "sk_test_51IF76bEYBLZCay1Q472t4mfSTBStMTqj8OcbLArfJgOsA8TpFxDgCI620NvL0S0TGyQXmlIdQ7rQj2CrsbI1VGRK00p4Q2Vif3",
  stripeKey:
    process.env.REACT_APP_STRIPE_KEY ||
    "pk_test_51IF76bEYBLZCay1QYy6zYdlG152TyC7cWY2V9101fi3ECcd8qoTPVBjW0EOb2VmgKPCuwWBBogvjQAjNHotH3Gjk00BYsM1fux",
  endpointURL:
    process.env.REACT_APP_ENDPOINT_URL ||
    "epcc-integration.global.ssl.fastly.net",
  algoliaAppId: process.env.REACT_APP_ALGOLIA_APP_ID || "SYIQ63DPU5",
  algoliaAPIKey:
    process.env.REACT_APP_ALGOLIA_API_KEY || "f37b8d33799600835efec12ceb576b03",
  algoliaIndexName: process.env.REACT_APP_ALGOLIA_INDEX_NAME || "d2c-reference",
  EpContextTag: "",
  EpChannel: "",
};
