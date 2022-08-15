import { withNavServerSideProps } from "../../lib/nav-wrapper-ssr";

import {
  getSearchSSRProps,
  ISearch,
  SearchQuery,
} from "../../lib/search-props";
import Search from "../../components/search/SearchPage";

export const getServerSideProps = withNavServerSideProps<ISearch, SearchQuery>(
  async (context) => {
    return getSearchSSRProps(Search)(context);
  }
);

export default Search;
