import { extendTheme } from "@chakra-ui/react";

// Basic styles
export const styles = {
  global: {
    html: {
      fontSize: "16px",
    },
  },
};

// Elastic Path default brand colours
const colors = {
  brand: {
    primary: {
      blue: "#0033CC",
      navy: "#091740",
      grey: "#6A6D72",
      tangerine: "#EA7317",
      yellow: "#ffcb47",
    },
  },
};

const theme = extendTheme({
  ...{ styles },
  ...{ colors },
});

export default theme;
