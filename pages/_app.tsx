import "../styles/globals.css";
import MainLayout from "../layouts/MainLayout/MainLayout";
import type { AppProps } from "next/app";
import { AppStateProvider } from "../context/state";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AppStateProvider>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </AppStateProvider>
    </ChakraProvider>
  );
}

export default MyApp;