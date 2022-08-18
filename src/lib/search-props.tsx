import type { GetServerSideProps } from "next";
import type { ParsedUrlQuery } from "querystring";
import type { InstantSearchServerState } from "react-instantsearch-hooks-web";

import { getServerState } from "react-instantsearch-hooks-server";
import type { FunctionComponent, ReactNode } from "react";
import React from "react";

export interface SearchQuery extends ParsedUrlQuery {
  nodeId: string;
}

export interface ISearch {
  algoliaServerState?: InstantSearchServerState;
  url: string;
}

export const getSearchSSRProps =
  (
    SearchComponent: FunctionComponent<ISearch>
  ): GetServerSideProps<ISearch, SearchQuery> =>
  async ({ req, res }) => {
    // SSR Caching
    // https://github.com/vercel/next.js/tree/canary/examples/ssr-caching
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=10, stale-while-revalidate=59"
    );

    const protocol = req.headers.referer?.split("://")[0] || "https";
    const url = `${protocol}://${req.headers.host}${req.url}`;
    const algoliaServerState = await getServerState(
      <SearchComponent url={url} />
    );

    return {
      props: {
        algoliaServerState,
        url,
      },
    };
  };
