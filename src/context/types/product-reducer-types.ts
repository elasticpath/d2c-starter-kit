import { CatalogsProductVariation, File, ProductResponse } from "@moltin/sdk";
import { MatrixObjectEntry } from "../../services/helper";
import { IProduct } from "../../lib/product-types";

/** --------------------------------- Product State --------------------------------- */

interface ProductStateBase {}

export interface LoadingProductState extends ProductStateBase {
  readonly kind: "loading-product-state";
}

/**
 * State the product is in when an error has occurred
 */
export interface ProductErrorState extends ProductStateBase {
  readonly kind: "product-error-state";

  /**
   * the error that occurred
   */
  readonly error: Error;
}

/**
 * State the product is in before it has fetched
 * this will happen if the provider is not given an initial product state.
 */
export interface UninitialisedProductState extends ProductStateBase {
  readonly kind: "uninitialised-product-state";
}

export interface PresentProductBaseState {
  product: ProductResponse;
  otherImages: File[];
  main_image?: File;
  component_products?: ProductResponse[];
}

export interface BaseProductPresentState extends PresentProductBaseState {
  kind: "base-product-present-state";
  variations: CatalogsProductVariation[];
  variationsMatrix: MatrixObjectEntry;
}

export interface ChildProductPresentState extends PresentProductBaseState {
  kind: "child-product-present-state";
  baseProduct: ProductResponse;
  variations: CatalogsProductVariation[];
  variationsMatrix: MatrixObjectEntry;
}

export interface SimpleProductPresentState extends PresentProductBaseState {
  kind: "simple-product-present-state";
}

/**
 * State the product is in when a product is loaded
 */
export type ProductPresentState =
  | BaseProductPresentState
  | ChildProductPresentState
  | SimpleProductPresentState;

/**
 * State the product is in when changing to a new product.
 */
export interface ChangingProductState extends ProductStateBase {
  readonly kind: "changing-product-state";

  /**
   * State of the cart when the updating event was triggered.
   */
  readonly previousProduct: ProductPresentState;
}

/**
 * Representing a state the product can be in.
 */
export type ProductState =
  | ProductPresentState
  | ChangingProductState
  | UninitialisedProductState
  | ProductErrorState
  | LoadingProductState;

/** --------------------------------- Product Actions --------------------------------- */

/**
 * Change the product with provided data
 */
export interface ChangeProductAction {
  type: "change-product";
  payload: {
    id: string;
    data: IProduct;
  };
}

/**
 * Let the product is being changed, it should be in a changing state.
 */
export interface ChangingProductAction {
  type: "changing-product";
}

/**
 * Let the product know it's currently being initialed most likely when your
 * fetching the data client side for the first time
 */
export interface InitialiseProductAction {
  type: "initialise-product";
}

/**
 * Actions that can be performed to change the state of the cart
 */
export type ProductAction =
  | InitialiseProductAction
  | ChangingProductAction
  | ChangeProductAction;
