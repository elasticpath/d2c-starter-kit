import type { GetServerSideProps } from "next";
import type { ParsedUrlQuery } from "querystring";
import type { InstantSearchServerState } from "react-instantsearch-hooks-web";

import { getServerState } from "react-instantsearch-hooks-server";
import type { FunctionComponent } from "react";
import React from "react";
import { BreadcrumbEntry, createBreadcrumb } from "./create-breadcrumb";

export interface SearchQuery extends ParsedUrlQuery {
  nodeId: string;
}

export interface ISearch {
  algoliaServerState?: InstantSearchServerState;
  url: string;
  node: string[];
  breadcrumbEntries: BreadcrumbEntry[];
}

export const getSearchSSRProps =
  (
    SearchComponent: FunctionComponent<ISearch>
  ): GetServerSideProps<ISearch, SearchQuery> =>
  async ({ req, params }) => {
    const protocol = req.headers.referer?.split("://")[0] || "https";
    const url = `${protocol}://${req.headers.host}${req.url}`;
    const node = (params?.node as string[]) ?? [];

    const breadcrumbEntries = createBreadcrumb(node);

    const algoliaServerState = await getServerState(
      <SearchComponent
        url={url}
        node={node}
        breadcrumbEntries={breadcrumbEntries}
      />
    );

    return {
      props: {
        algoliaServerState,
        url,
        node,
        breadcrumbEntries,
      },
    };
  };
