import { ComponentStyleConfig, extendTheme } from "@chakra-ui/react";

export const globalBaseWidth = "7xl";

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
