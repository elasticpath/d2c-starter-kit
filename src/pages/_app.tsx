import MainLayout from "../layouts/MainLayout/MainLayout";
import Store from "../context/store";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import "../components/checkout/CardSectionStyles.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Store>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </Store>
    </ChakraProvider>
  );
}

export default MyApp;
