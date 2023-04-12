import { Grid } from "@chakra-ui/react";
import type { ProductResponse } from "@moltin/sdk";
import { useEffect } from "react";
import Script from "next/script";
import { yotpoEnv } from "../../../lib/resolve-yotpo-env";
import StarRatings from "react-star-ratings";

declare global {
  interface Window {
    yotpo?: {
      refreshWidgets: Function;
    };
  }
}

interface IReviews {
  product: ProductResponse;
}

interface IRatings {
  product: ProductResponse;
  displayFromProduct?: boolean;
}

const Reviews = ({ product }: IReviews): JSX.Element => {
  useEffect(() => {
    if (yotpoEnv.enable && typeof window.yotpo !== "undefined") {
      window.yotpo.refreshWidgets();
    }
  }, [product.id]);

  const {
    id,
    attributes,
    meta: { display_price },
  } = product;

  return yotpoEnv.enable ? (
    <Grid>
      <Script
        id="yotpo-reviews"
        src={`//staticw2.yotpo.com/${yotpoEnv.appKey}/widget.js`}
      />
      <div
        className="yotpo yotpo-main-widget"
        style={{ marginTop: "20px" }}
        data-product-id={id}
        data-price={
          display_price?.without_tax.amount
            ? display_price?.without_tax.amount / 100
            : 0
        }
        data-currency={display_price?.without_tax.currency}
        data-name={attributes.name}
      ></div>
    </Grid>
  ) : (
    <></>
  );
};

const Ratings = ({ product, displayFromProduct }: IRatings): JSX.Element => {
  useEffect(() => {
    if (yotpoEnv.enable && typeof window.yotpo !== "undefined") {
      window.yotpo.refreshWidgets();
    }
  }, [product.id]);

  if (displayFromProduct) {
    return yotpoEnv.enable ? (
      <Grid
        color="gray.500"
        fontWeight="semibold"
        letterSpacing="wide"
        fontSize="xs"
        mt="1"
        noOfLines={6}
        margin={2}
      >
        <>
          <StarRatings
            rating={Number(
              product.attributes.extensions?.["products(ratings)"]
                ?.average_rating || ""
            )}
            starDimension="18px"
            starSpacing="0px"
            starRatedColor="orange"
          />{" "}
          (
          {product.attributes.extensions?.["products(ratings)"]?.review_count ||
            0}
          )
        </>
      </Grid>
    ) : (
      <></>
    );
  }
  return yotpoEnv.enable ? (
    <Grid marginTop={5}>
      <Script
        id="yotpo-reviews"
        src={`//staticw2.yotpo.com/${yotpoEnv.appKey}/widget.js`}
      />
      <div
        className="yotpo bottomLine"
        data-yotpo-product-id={product.id}
      ></div>
    </Grid>
  ) : (
    <></>
  );
};

export default Reviews;
export { Ratings };
