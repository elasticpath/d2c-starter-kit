import ColorRefinement from "./ColorRefinement";
import BrandRefinement from "./BrandRefirement";
import OnSaleRefinement from "./OnSaleRefirement";
import RatingRefinement from "./RatingRefinement";
import { reviewsEnv } from "../../../lib/resolve-reviews-field-env";

const ProductSpecification = () => {
  return (
    <>
      {reviewsEnv.enable && (
        <RatingRefinement attribute={reviewsEnv.avgRatingField} />
      )}
      <BrandRefinement attribute="ep_extensions_products_specifications.brand" />
      <OnSaleRefinement attribute="ep_extensions_products_specifications.on-sale" />
      <ColorRefinement attribute="ep_extensions_products_specifications.color" />
    </>
  );
};

export default ProductSpecification;
