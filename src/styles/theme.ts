import { extendTheme } from "@chakra-ui/react";

// Elastic Path default brand colours
const theme = extendTheme({
  colors: {
    brand: {
      primary: {
        blue: "#0033CC",
        navy: "#091740",
        grey: "#6A6D72",
        tangerine: "#EA7317",
        yellow: "#ffcb47",
      },
    },
  },
});

export default theme;
