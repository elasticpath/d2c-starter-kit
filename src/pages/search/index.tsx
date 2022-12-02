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
import MainLayout from "../../components/layouts/MainLayout";

Search.getLayout = function getLayout(page: ReactElement, pageProps, ctx) {
  return (
    <>
      <MainLayout nav={ctx?.nav ?? []}>{page}</MainLayout>
      <Head>
        <title>{pageProps.node.join("/")}</title>
        <meta name="description" content={pageProps.node.join("/")} />
      </Head>
    </>
  );
};

export const getServerSideProps = withStoreServerSideProps<
  ISearch,
  SearchQuery
>(async (context, nav) => {
  return getSearchSSRProps(Search, buildBreadcrumbLookup(nav))(context);
});

export default Search;
