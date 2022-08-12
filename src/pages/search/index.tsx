import type { GetServerSideProps } from "next";

import {
  getSearchSSRProps,
  ISearch,
  SearchQuery,
} from "../../lib/search-props";
import Search from "../../components/search/SearchPage";

export const getServerSideProps: GetServerSideProps<
  ISearch,
  SearchQuery
> = async (context) => {
  return getSearchSSRProps(Search)(context);
};

export default Search;
