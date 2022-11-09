import MainLayout from "../layouts/main-layout/MainLayout";
import StoreNextJSProvider from "../providers/store-provider";
import type { AppProps as NextAppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";
import "focus-visible/dist/focus-visible";
import "../components/checkout/CardSectionStyles.css";
import "../styles/globals.css";
import { StoreContext } from "@field123/epcc-react";

// modified version - allows for custom pageProps type, falling back to 'any'
type AppProps<P = {}> = {
  pageProps: P;
} & Omit<NextAppProps<P>, "pageProps">;

interface CustomAppProps {
  store: StoreContext | undefined;
}
function MyApp({ Component, pageProps }: AppProps<CustomAppProps>) {
  return (
    <ChakraProvider theme={theme}>
      <StoreNextJSProvider storeContext={pageProps.store}>
        <MainLayout nav={pageProps.store?.nav ?? []}>
          <Component {...pageProps} />
        </MainLayout>
      </StoreNextJSProvider>
    </ChakraProvider>
  );
}

export default MyApp;
