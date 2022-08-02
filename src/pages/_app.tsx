import MainLayout from "../layouts/MainLayout/MainLayout";
import StoreProvider from "../context/store";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import "../components/checkout/CardSectionStyles.css";
import "../styles/globals.css";
import { InstantSearch } from "react-instantsearch-hooks-web";
import { searchClient } from "../lib/search-client";
import { algoliaEnvData } from "../lib/resolve-algolia-env";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <StoreProvider>
        <MainLayout nav={pageProps.nav}>
          <InstantSearch
            searchClient={searchClient}
            indexName={algoliaEnvData.indexName}
          >
            <Component {...pageProps} />
          </InstantSearch>
        </MainLayout>
      </StoreProvider>
    </ChakraProvider>
  );
}

export default MyApp;
