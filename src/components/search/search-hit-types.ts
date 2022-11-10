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

export interface ProductSearchResultItems {
  ep_description: string;
  ep_name: string;
  ep_price: {
    [key: string]: {
      formatted_price?: string;
      sale_prices?: {
        original_price: {
          formatted_price: string;
        };
      };
    };
  };
  ep_sku: string;
  ep_slug: string;
  ep_main_image_url?: string;
  objectID: string;
}
