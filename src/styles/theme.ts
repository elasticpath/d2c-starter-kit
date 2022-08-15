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
    primary: "#0033CC",
    secondary: "#091740",
    primaryAlt: "#EA7317",
    secondaryAlt: "#ffcb47",
  },
};

const theme = extendTheme({
  ...{ styles },
  ...{ colors },
});

export default theme;
