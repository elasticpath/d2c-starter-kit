import { BaseHit } from "instantsearch.js";
import { reviewsEnv } from "../../lib/resolve-reviews-field-env";

type HitSalePrice = {
  amount: number;
  includes_tax: boolean;
  tiers: any;
  formatted_price: string;
  float_price: number;
  on_sale: boolean;
  original_price: {
    amount: number;
    formatted_price: string;
    float_price: number;
  };
};

type HitPrice = {
  [key: string]: {
    amount: number;
    includes_tax: boolean;
    tiers: {
      [key: string]: {
        minimum_quantity: number;
        amount: number;
      };
    } | null;
    formatted_price: string;
    float_price: number;
    on_sale: boolean;
    sale_prices?: HitSalePrice;
  };
};

const avgRatingField: unique symbol = Symbol(reviewsEnv.avgRatingField);
const reviewCountField: unique symbol = Symbol(reviewsEnv.reviewCountField);

export interface SearchHit extends BaseHit {
  ep_amount: number;
  ep_categories: string[];
  ep_description: string;
  ep_name: string;
  ep_price?: HitPrice;
  ep_sku: string;
  ep_slug: string;
  ep_main_image_url: string;
  ep_image_url: string;
  objectID: string;
  [avgRatingField]?: string;
  [reviewCountField]?: string;
}
