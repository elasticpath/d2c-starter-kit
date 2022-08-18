export type SearchQuerySortByOrder = "asc" | "desc";

export interface SearchQuerySortBy {
  attribute?: string;
  order: SearchQuerySortByOrder;
}

export interface SearchQueryProperties {
  query?: string;
  page?: number;
  brands?: string[];
  sortBy?: SearchQuerySortBy;
}
