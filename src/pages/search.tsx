import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import SearchResults from "../components/search/SearchResults";
import { InstantSearch } from "react-instantsearch-hooks-web";
import { searchClient } from "../lib/search-client";
import { algoliaEnvData } from "../lib/resolve-algolia-env";

export const Search: NextPage<{}> = () => {
  const router = useRouter();
  const { search } = router.query;

  return (
    <Box px={24} py={8}>
      <Text>Search results for</Text>
      <Heading>&quot;{search}&quot;</Heading>

      <InstantSearch
        searchClient={searchClient}
        indexName={algoliaEnvData.indexName}
      >
        {search && (
          <SearchResults
            query={typeof search === "string" ? search : search[0]}
          />
        )}
      </InstantSearch>
    </Box>
  );
};

export default Search;
