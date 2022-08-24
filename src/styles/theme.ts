import { ComponentStyleConfig, extendTheme } from "@chakra-ui/react";

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
    hover: {
      blue: "#002699",
    },
  },
};

// Custom Checkbox Styles
const Checkbox: ComponentStyleConfig = {
  baseStyle: {
    control: {
      bg: "white",
      _checked: {
        bg: "brand.primary.blue",
        borderColor: "brand.primary.blue",
        _hover: {
          bg: "brand.hover.blue",
          borderColor: "brand.hover.blue",
        },
      },
      _indeterminate: {
        bg: "brand.primary.blue",
        borderColor: "brand.primary.blue",
      },
    },
  },
};

const theme = extendTheme({
  ...{ styles },
  ...{ colors },
  components: {
    Checkbox,
  },
});

export default theme;
