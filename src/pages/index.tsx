import type { NextPage } from "next";
import type { Hierarchy, Node, Promotion } from "@moltin/sdk";
import "pure-react-carousel/dist/react-carousel.es.css";
import { chakra, Grid, GridItem } from "@chakra-ui/react";
import PromotionBanner from "../components/PromotionBanner/PromotionBanner";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import NodeDisplay from "../components/node/NodeDisplay";
import { ProductResponseWithImage } from "../lib/product-types";
import {
  buildSiteNavigation,
  buildStaticFeaturedNodes,
  buildStaticFeaturedProducts,
  buildStaticPromotion,
} from "../lib/homepage-content-utils";

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
  const nodeId = process.env.NEXT_PUBLIC_DEMO_NODE_ID || "";

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
          <NodeDisplay
            type="provided"
            nodes={featuredNodes}
            linkProps={{ text: "Browse all categories", link: "/search" }}
            title="Shop by Category"
          ></NodeDisplay>
        </GridItem>
      </Grid>
    </chakra.main>
  );
};

export const getStaticProps = withNavStaticProps<IHome>(async () => {
  // Fetching static data for the home page
  const staticNav = await buildSiteNavigation();
  const promotion = await buildStaticPromotion();
  const featuredProducts = await buildStaticFeaturedProducts();
  const featuredNodes = await buildStaticFeaturedNodes();

  return {
    props: {
      promotion,
      featuredProducts,
      featuredNodes,
      staticNav,
    },
  };
});

export default Home;
