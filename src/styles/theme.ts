import { ComponentStyleConfig, extendTheme } from "@chakra-ui/react";

export const globalBaseWidth = "100%";

// Basic styles
export const styles = {
  global: {
    html: {
      fontSize: "15px",
    },
  },
};

// Elastic Path default brand colours
const colors = {
  brand: {
    primary: "#0033CC",
    secondary: "#091740",
    highlight: "#1E40AF",
    primaryAlt: "#EA7317",
    secondaryAlt: "#ffcb47",
  },
  text: {
    primary: "#999999",
    secondary: "#FFFFFF",
  },
};

// Custom Checkbox Styles
const Checkbox: ComponentStyleConfig = {
  baseStyle: {
    control: {
      bg: "white",
      _checked: {
        bg: "brand.primary",
        borderColor: "brand.primary",
        _hover: {
          bg: "brand.highlight",
          borderColor: "brand.highlight",
        },
      },
      _indeterminate: {
        bg: "brand.primary",
        borderColor: "brand.primary",
      },
    },
  },
};

const breakpoints = {
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
};

const theme = extendTheme({
  ...{ styles },
  ...{ colors },
  ...{ breakpoints },
  components: {
    Checkbox,
  },
});

export default theme;
