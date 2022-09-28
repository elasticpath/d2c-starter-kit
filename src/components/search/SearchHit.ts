import { BaseHit } from "instantsearch.js";

export interface SearchHit extends BaseHit {
  ep_amount: number;
  ep_categories: string[];
  ep_description: string;
  ep_name: string;
  ep_price?: {
    [key: string]: {
      amount: number;
      includes_tax: boolean;
      formatted_price: string;
      float_price: number;
    };
  };
  ep_sku: string;
  ep_slug: string;
  ep_main_image_url: string;
  ep_image_url: string;
  objectID: string;
}
