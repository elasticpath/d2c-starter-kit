import { withStoreServerSideProps } from "../../lib/store-wrapper-ssr";

import {
  getSearchSSRProps,
  ISearch,
  SearchQuery,
} from "../../lib/search-props";
import Search from "../../components/search/SearchPage";
import { buildBreadcrumbLookup } from "../../lib/build-breadcrumb-lookup";

interface INodeSearch extends ISearch {
  nodeName?: string | string[];
}

export function NodeSearch(props: INodeSearch): JSX.Element {
  return <Search {...props} />;
}

export const getServerSideProps = withStoreServerSideProps<
  ISearch,
  SearchQuery
>(async (context, nav) => {
  return getSearchSSRProps(NodeSearch, buildBreadcrumbLookup(nav))(context);
});

export default NodeSearch;
