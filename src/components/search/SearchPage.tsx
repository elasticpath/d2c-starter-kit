import React from "react";
import { Box } from "@chakra-ui/react";
import SearchResults from "./SearchResults";
import {
  InstantSearch,
  InstantSearchSSRProvider,
} from "react-instantsearch-hooks-web";
import { searchClient } from "../../lib/search-client";
import { algoliaEnvData } from "../../lib/resolve-algolia-env";
import { resolveRouting } from "../../lib/algolia-search-routing";
import { ISearch } from "../../lib/search-props";

export const Search = ({ algoliaServerState, url }: ISearch) => {
  return (
    <Box px={24} py={8}>
      <InstantSearchSSRProvider {...algoliaServerState}>
        <InstantSearch
          searchClient={searchClient}
          indexName={algoliaEnvData.indexName}
          routing={resolveRouting(url)}
        >
          <SearchResults />
        </InstantSearch>
      </InstantSearchSSRProvider>
    </Box>
  );
};

export default Search;
