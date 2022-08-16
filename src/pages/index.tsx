import type { NextPage } from "next";
import type { Hierarchy, Node, Promotion } from "@moltin/sdk";
import "pure-react-carousel/dist/react-carousel.es.css";
import { chakra, Grid, GridItem } from "@chakra-ui/react";
import { ProductResponseWithImage } from "../lib/product-types";

import PromotionBanner from "../components/promotion-banner/PromotionBanner";
import { fetchFeaturedPromotion } from "../components/promotion-banner/fetchFeaturedPromotion";

import FeaturedProducts from "../components/featured-products/FeaturedProducts";
import { fetchFeaturedProducts } from "../components/featured-products/fetchFeaturedProducts";

import FeaturedNodes from "../components/featured-nodes/FeaturedNodes";
import { fetchFeaturedNodes } from "../components/featured-nodes/fetchFeaturedNodes";

import { withNavStaticProps } from "../lib/nav-wrapper-ssg";

const nodeId = process.env.NEXT_PUBLIC_DEMO_NODE_ID || "";
const promotionId = process.env.NEXT_PUBLIC_DEMO_PROMOTION_ID || "";

export interface IHome {
  promotion: Promotion;
  featuredProducts: ProductResponseWithImage[];
  featuredNodes: Node[];
}

const Home: NextPage<IHome> = ({
  promotion,
  featuredProducts,
  featuredNodes,
}) => {
  return (
    <chakra.main>
      <PromotionBanner
        promotion={promotion}
        linkProps={{
          link: "/cart",
          text: "Shop Now",
        }}
      />
      <Grid gap="12" padding={{ base: "2rem", md: "4rem" }}>
        <GridItem>
          <FeaturedProducts
            title="Trending Products"
            linkProps={{
              link: `/category/${nodeId}`,
              text: "See all products",
            }}
            type="provided"
            products={featuredProducts}
          />
        </GridItem>
        <GridItem>
          <FeaturedNodes
            type="provided"
            nodes={featuredNodes}
            linkProps={{ text: "Browse all categories", link: "/search" }}
            title="Shop by Category"
          ></FeaturedNodes>
        </GridItem>
      </Grid>
    </chakra.main>
  );
};

export const getStaticProps = withNavStaticProps<IHome>(async () => {
  // Fetching static data for the home page
  const promotion = await fetchFeaturedPromotion(promotionId);
  const featuredProducts = await fetchFeaturedProducts(nodeId);
  const featuredNodes = await fetchFeaturedNodes();

  return {
    props: {
      promotion,
      featuredProducts,
      featuredNodes,
    },
  };
});

export default Home;
