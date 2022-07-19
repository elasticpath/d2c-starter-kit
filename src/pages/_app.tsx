import MainLayout from "../layouts/MainLayout/MainLayout";
import StoreProvider from "../context/store";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import "../components/checkout/CardSectionStyles.css";
import "../styles/globals.css";
import { InstantSearch } from "react-instantsearch-hooks-web";
import algoliasearch from "algoliasearch/lite";

const searchClient = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID || "SYIQ63DPU5",
  process.env.REACT_APP_ALGOLIA_API_KEY || "f37b8d33799600835efec12ceb576b03"
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <StoreProvider>
        <MainLayout>
          <InstantSearch
            searchClient={searchClient}
            indexName={
              process.env.REACT_APP_ALGOLIA_INDEX_NAME || "d2c-reference"
            }
          >
            <Component {...pageProps} />
          </InstantSearch>
        </MainLayout>
      </StoreProvider>
    </ChakraProvider>
  );
}

export default MyApp;
