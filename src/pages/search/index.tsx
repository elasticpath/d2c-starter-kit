import { withStoreServerSideProps } from "../../lib/store-wrapper-ssr";

import {
  getSearchSSRProps,
  ISearch,
  SearchQuery,
} from "../../lib/search-props";
import Search from "../../components/search/SearchPage";
import { buildBreadcrumbLookup } from "../../lib/build-breadcrumb-lookup";

export const getServerSideProps = withStoreServerSideProps<
  ISearch,
  SearchQuery
>(async (context, nav) => {
  return getSearchSSRProps(Search, buildBreadcrumbLookup(nav))(context);
});

export default Search;
