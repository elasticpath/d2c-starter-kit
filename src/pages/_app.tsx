import MainLayout from "../layouts/MainLayout/MainLayout";
import StoreProvider from "../context/store";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import "../components/checkout/CardSectionStyles.css";
import "../styles/globals.css";
import { InstantSearch } from "react-instantsearch-hooks-web";
import algoliasearch from "algoliasearch/lite";
import { config } from "../services/config";

const searchClient = algoliasearch(config.algoliaAppId, config.algoliaAPIKey);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <StoreProvider>
        <MainLayout>
          <InstantSearch
            searchClient={searchClient}
            indexName={config.algoliaIndexName}
          >
            <Component {...pageProps} />
          </InstantSearch>
        </MainLayout>
      </StoreProvider>
    </ChakraProvider>
  );
}

export default MyApp;
