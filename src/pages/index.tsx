import type { NextPage } from "next";
import { chakra, Grid, GridItem } from "@chakra-ui/react";

import type { Node, Promotion } from "@moltin/sdk";
import { ProductResponseWithImage } from "../lib/product-types";

import PromotionBanner from "../components/promotion-banner/PromotionBanner";
import { fetchFeaturedPromotion } from "../components/promotion-banner/fetchFeaturedPromotion";

import FeaturedProducts from "../components/featured-products/FeaturedProducts";
import { fetchFeaturedProducts } from "../components/featured-products/fetchFeaturedProducts";

import FeaturedNodes from "../components/featured-nodes/FeaturedNodes";
import { fetchFeaturedNodes } from "../components/featured-nodes/fetchFeaturedNodes";

import { withNavStaticProps } from "../lib/nav-wrapper-ssg";

const nodeId = process.env.NEXT_PUBLIC_DEMO_NODE_ID || "";
const promotionId = process.env.NEXT_PUBLIC_DEMO_PROMO_ID || "";

export interface IHome {
  promotion?: Promotion;
  featuredProducts?: ProductResponseWithImage[];
  featuredNodes?: Node[];
}

const Home: NextPage<IHome> = ({
  promotion,
  featuredProducts,
  featuredNodes,
}) => {
  return (
    <chakra.main>
      {promotion && (
        <PromotionBanner
          promotion={promotion}
          linkProps={{
            link: "/cart",
            text: "Shop Now",
          }}
        />
      )}
      <Grid gap="12" padding={{ base: "2rem", md: "4rem" }}>
        <GridItem>
          {featuredProducts && (
            <FeaturedProducts
              title="Trending Products"
              linkProps={{
                link: `/category/${nodeId}`,
                text: "See all products",
              }}
              type="provided"
              products={featuredProducts}
            />
          )}
        </GridItem>
        <GridItem>
          {featuredNodes && (
            <FeaturedNodes
              type="provided"
              nodes={featuredNodes}
              linkProps={{ text: "Browse all categories", link: "/category" }}
              title="Shop by Category"
            />
          )}
        </GridItem>
      </Grid>
    </chakra.main>
  );
};

export const getStaticProps = withNavStaticProps<IHome>(async () => {
  // Fetching static data for the home page
  const promotion = promotionId
    ? await fetchFeaturedPromotion(promotionId)
    : undefined;
  const featuredProducts = nodeId
    ? await fetchFeaturedProducts(nodeId)
    : undefined;
  const featuredNodes = await fetchFeaturedNodes();

  return {
    props: {
      featuredNodes,
      ...(promotion && { promotion }),
      ...(featuredProducts && { featuredProducts }),
    },
  };
});

export default Home;
