import { history } from "instantsearch.js/es/lib/routers";
import { InstantSearchOptions } from "instantsearch.js";
import { algoliaEnvData } from "./resolve-algolia-env";
import type {
  SearchQueryProperties,
  SearchQuerySortBy,
} from "./types/search-query-params";
import { SearchRouteState } from "./types/search-route-state";
import { CustomUiState } from "./types/search-custom-algolia-ui-state";

// Returns a slug from the category name.
// Spaces are replaced by "+" to make
// the URL easier to read and other
// characters are encoded.
function getCategorySlug(name: string): string {
  return name.split(" ").map(encodeURIComponent).join("+");
}

// Returns a slug from the category name.
// Spaces are replaced by "+" to make
// the URL easier to read and other
// characters are encoded.
function getCategorySlugs(names: string[]): string {
  return names.map(getCategorySlug).join("/");
}

// Returns a name from the category slug.
// The "+" are replaced by spaces and other
// characters are decoded.
function getCategoryName(slug: string): string {
  return slug.split("+").map(decodeURIComponent).join(" ");
}

// Returns a name from the category slug.
// The "+" are replaced by spaces and other
// characters are decoded.
function getCategoryNames(slug: string): string[] {
  return slug.split("/").map(getCategoryName);
}

function resolveSort(sortBy: string): SearchQuerySortBy {
  const withoutIndexName = sortBy.replace(`${algoliaEnvData.indexName}_`, "");

  const [attribute, order] = withoutIndexName.split("_");

  if (order !== "asc" && order !== "desc") {
    throw new Error(
      `Failed to resolve order of provided sortBy value: ${sortBy} to supported sort by order e.g. asc or desc`
    );
  }

  return {
    order,
    attribute,
  };
}

const EP_ROUTE_CATEGORY = "ep_slug_categories.lvl0";

export function resolveRouting(
  url: string
): Exclude<
  InstantSearchOptions<CustomUiState, SearchRouteState>["routing"],
  boolean | undefined
> {
  return {
    router: history({
      createURL({ qsModule, routeState, location }) {
        const urlParts = location.href.match(/^(.*?)\/search/);
        const baseUrl = `${urlParts ? urlParts[1] : ""}/`;

        const categoryPath = routeState.categories
          ? `${getCategorySlugs(routeState.categories)}`
          : "";

        const queryParameters: SearchQueryProperties = {};

        if (routeState.query) {
          queryParameters.query = encodeURIComponent(routeState.query);
        }
        if (routeState.page !== 1) {
          queryParameters.page = routeState.page;
        }
        if (routeState.brands) {
          queryParameters.brands = routeState.brands.map(encodeURIComponent);
        }
        if (routeState.sortBy) {
          queryParameters.sortBy = resolveSort(routeState.sortBy);
        }

        const queryString = qsModule.stringify(queryParameters, {
          addQueryPrefix: true,
          arrayFormat: "repeat",
        });

        return `${baseUrl}search/${categoryPath}${queryString}`;
      },

      parseURL({ qsModule, location }) {
        const pathnameMatches = location.pathname.match(/search\/(.*?)\/?$/);

        const categories = getCategoryNames(pathnameMatches?.[1] || "");

        const {
          query = "",
          page,
          brands = [],
          sortBy,
        } = qsModule.parse(location.search.slice(1)) as SearchQueryProperties;
        // `qs` does not return an array when there's a single value.
        const allBrands = Array.isArray(brands)
          ? brands
          : [brands].filter(Boolean);

        return {
          query: decodeURIComponent(query),
          page,
          brands: allBrands.map(decodeURIComponent),
          categories,
          sortBy:
            sortBy &&
            `${algoliaEnvData.indexName}_${sortBy?.attribute}_${
              sortBy?.order ?? "asc"
            }`,
        };
      },
      getLocation: () =>
        typeof window === "undefined"
          ? (new URL(url) as unknown as Location)
          : window.location,
    }),

    stateMapping: {
      stateToRoute(uiState) {
        const indexUiState = uiState[algoliaEnvData.indexName] || {};

        return {
          query: indexUiState.query,
          page: indexUiState.page,
          brands: indexUiState.refinementList?.brand,
          categories: indexUiState.hierarchicalMenu?.[EP_ROUTE_CATEGORY],
          sortBy: indexUiState.sortBy,
        };
      },
      routeToState(routeState) {
        const { query, page, categories, brands, sortBy } = routeState;
        return {
          [algoliaEnvData.indexName]: {
            query: query,
            page: page,
            hierarchicalMenu: categories && {
              [EP_ROUTE_CATEGORY]: categories,
            },
            refinementList: brands && {
              brand: brands,
            },
            sortBy: sortBy,
          },
        };
      },
    },
  };
}
