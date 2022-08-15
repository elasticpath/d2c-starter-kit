import type { NextPage } from "next";
import type { Hierarchy, Node, Promotion } from "@moltin/sdk";
import "pure-react-carousel/dist/react-carousel.es.css";
import { chakra, Grid, GridItem } from "@chakra-ui/react";
import {
  getHierarchies,
  getNodeChildren,
  getHierarchyChildren,
} from "../services/hierarchy";
import { StaticProduct, staticProducts } from "../lib/product-data";
import ProductShowcaseCarousel from "../components/product/carousel/ProductShowcaseCarousel";
import PromotionBanner from "../components/PromotionBanner/PromotionBanner";
import { getPromotionById } from "../services/promotions";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import NodeDisplay from "../components/node/NodeDisplay";
import {
  Featured,
  getFeaturedNodeProducts,
} from "../lib/get-featured-node-products";
import { withNavStaticProps } from "../lib/nav-wrapper-ssg";

const NODE_ID = process.env.NEXT_PUBLIC_DEMO_NODE_ID;
const PROMOTION_ID = process.env.NEXT_PUBLIC_DEMO_PROMO_ID;

export interface IHome {
  staticProducts: StaticProduct[];
  hierarchies?: Hierarchy[];
  categoryNodes: Node[];
  promotion?: Promotion;
  featured?: Featured;
}

const Home: NextPage<IHome> = (val) => {
  const { staticProducts, promotion, featured, categoryNodes } = val;
  console.log("value: ", val);
  return (
    <chakra.main>
      {promotion && (
        <PromotionBanner
          type="provided"
          promotion={promotion}
          linkProps={{
            link: "/cart",
            text: "Shop Now",
          }}
        />
      )}
      <Grid gap="12" padding={{ base: "2rem", md: "4rem" }}>
        {featured && (
          <GridItem>
            <FeaturedProducts
              title="Trending Products"
              linkProps={{
                link: `/category/${featured.nodeId}`,
                text: "See all products",
              }}
              type="provided"
              products={featured.featuredNodeProducts}
            />
          </GridItem>
        )}
        <GridItem>
          <NodeDisplay
            type="provided"
            nodes={categoryNodes}
            linkProps={{ text: "Browse all categories", link: "/category" }}
            title="Shop by Category"
          ></NodeDisplay>
        </GridItem>
      </Grid>
      <ProductShowcaseCarousel products={staticProducts} />
    </chakra.main>
  );
};

export const getStaticProps = withNavStaticProps<IHome>(async () => {
  // Fetching static data for the home page

  // Fetching the data for a specific promotion for the home page PromotionBanner
  const promotion = PROMOTION_ID
    ? await getPromotionById(PROMOTION_ID)
    : undefined;

  // Fetching the first 4 products of a node to display in the FeaturedProducts component
  const featured = NODE_ID ? await getFeaturedNodeProducts(NODE_ID) : undefined;

  // Fetching a nodes to display in the NodeDisplay component
  const hierarchies = await getHierarchies();
  const hierarchyChildren =
    hierarchies.length > 0 ? await getHierarchyChildren(hierarchies[0].id) : [];

  // As an example, use first hierarchy's child, if there is one
  const parentNode =
    hierarchyChildren.length > 0 ? hierarchyChildren[0] : undefined;

  const categoryNodes = parentNode ? await getNodeChildren(parentNode?.id) : [];

  return {
    props: {
      staticProducts,
      hierarchies,
      categoryNodes,
      ...(promotion && { promotion: promotion.data }),
      ...(featured && { featured }),
    },
  };
});

export default Home;
