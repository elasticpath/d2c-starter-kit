import { withStoreServerSideProps } from "../../lib/store-wrapper-ssr";

import {
  getSearchSSRProps,
  ISearch,
  SearchQuery,
} from "../../lib/search-props";
import Search from "../../components/search/SearchPage";
import { buildBreadcrumbLookup } from "../../lib/build-breadcrumb-lookup";
import React, { ReactElement } from "react";
import Head from "next/head";
import { StoreContext } from "@elasticpath/react-shopper-hooks";
import { getMainLayout } from "../../lib/get-main-layout";

interface INodeSearch extends ISearch {
  nodeName?: string | string[];
}

export function NodeSearch(props: INodeSearch): JSX.Element {
  return <Search {...props} />;
}

NodeSearch.getLayout = function getLayout(
  page: ReactElement,
  pageProps: { node: string[] },
  ctx?: StoreContext
) {
  return (
    <>
      {getMainLayout(page, pageProps, ctx)}
      <Head>
        <title>{pageProps.node.join("/")}</title>
        <meta name="description" content={pageProps.node.join("/")} />
      </Head>
      {page}
    </>
  );
};

export const getServerSideProps = withStoreServerSideProps<
  ISearch,
  SearchQuery
>(async (context, nav) => {
  return getSearchSSRProps(NodeSearch, buildBreadcrumbLookup(nav))(context);
});

export default NodeSearch;
