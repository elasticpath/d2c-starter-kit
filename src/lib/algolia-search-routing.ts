import { algoliaEnvData } from "./resolve-algolia-env";
import { RouterParams } from "./types/search-query-params";
import { NextRouterHandlerProps } from "./use-next-router-handler";

const EP_ROUTE_CATEGORY = "ep_slug_categories.lvl0";

export function resolveRouting(
  node: string[],
  url: string
): NextRouterHandlerProps<RouterParams> & { url: string } {
  return {
    dynamicRouteQuery: {},
    url,
    routeToState(routeState) {
      //  stateNode set to default to node for initial direct navigation render
      const {
        query,
        page,
        node: stateNode = node,
        sortBy,
        range = "",
      } = routeState;
      return {
        [algoliaEnvData.indexName]: {
          query: query,
          page: page,
          hierarchicalMenu: stateNode && {
            [EP_ROUTE_CATEGORY]: Array.isArray(stateNode)
              ? stateNode
              : [stateNode],
          },
          sortBy: sortBy,
          range: {
            "ep_price.USD.float_price": range,
          },
        },
      };
    },
    stateToRoute(uiState) {
      const indexUiState = uiState[algoliaEnvData.indexName] || {};
      const { query, page, hierarchicalMenu, sortBy, range } = indexUiState;
      return {
        query,
        page,
        sortBy,
        node: hierarchicalMenu?.[EP_ROUTE_CATEGORY],
        range: range?.["ep_price.USD.float_price"],
      };
    },
  };
}
