import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import SearchResults from "../components/search/SearchResults";

export const Search: NextPage<{}> = () => {
  const router = useRouter();
  const { search } = router.query;

  return (
    <Box px={24} py={8}>
      <Text>Search results for</Text>
      <Heading>&quot;{search}&quot;</Heading>
      {search && (
        <SearchResults
          query={typeof search === "string" ? search : search[0]}
        />
      )}
    </Box>
  );
};

export default Search;
