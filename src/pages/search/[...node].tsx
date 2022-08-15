import { withNavServerSideProps } from "../../lib/nav-wrapper-ssr";

import {
  getSearchSSRProps,
  ISearch,
  SearchQuery,
} from "../../lib/search-props";
import Search from "../../components/search/SearchPage";

interface INodeSearch extends ISearch {
  nodeName?: string | string[];
}

export function NodeSearch(props: INodeSearch): JSX.Element {
  return <Search {...props} />;
}

export const getServerSideProps = withNavServerSideProps<ISearch, SearchQuery>(
  async (context) => {
    return getSearchSSRProps(NodeSearch)(context);
  }
);

export default NodeSearch;
