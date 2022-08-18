import { IndexUiState } from "instantsearch.js";

export declare type CustomUiState = {
  [indexId: string]: CustomIndexUiState;
};

export interface CustomIndexUiState extends IndexUiState {}
