import type { GetStaticProps, NextPage } from "next";
import type { Hierarchy, Node, Promotion } from "@moltin/sdk";
import "pure-react-carousel/dist/react-carousel.es.css";
import { chakra, Grid, GridItem } from "@chakra-ui/react";
import {
  getHierarchies,
  getNodeChildren,
  getHierarchyChildren,
  getHierarchyNodes,
} from "../services/hierarchy";
import { StaticProduct, staticProducts } from "../lib/product-data";
import ProductShowcaseCarousel from "../components/product/carousel/ProductShowcaseCarousel";
import PromotionBanner from "../components/PromotionBanner/PromotionBanner";
import { getPromotionById } from "../services/promotions";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import { getProductsByNode } from "../services/hierarchy";
import { connectProductsWithMainImages } from "../lib/product-util";
import NodeDisplay from "../components/node/NodeDisplay";
import { ProductResponseWithImage } from "../lib/product-types";

const NODE_ID = process.env.NEXT_PUBLIC_DEMO_NODE_ID || "";
const PROMOTION_ID = process.env.NEXT_PUBLIC_DEMO_PROMO_ID || "";

export interface IHome {
  staticProducts: StaticProduct[];
  hierarchies?: Hierarchy[];
  categoryNodes: Node[];
  promotion: Promotion;
  featuredNodeProducts: ProductResponseWithImage[];
}

const Home: NextPage<IHome> = ({
  staticProducts,
  promotion,
  featuredNodeProducts,
  categoryNodes,
}) => {
  const nodeId = NODE_ID;

  return (
    <chakra.main>
      <PromotionBanner
        type="provided"
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
            products={featuredNodeProducts}
          />
        </GridItem>
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

export const getStaticProps: GetStaticProps<IHome> = async () => {
  // Fetching static data for the home page

  // Fetching the data for a specific promotion for the home page PromotionBanner
  const { data: promotion } = await getPromotionById(PROMOTION_ID);

  // Fetching the first 4 products of a node to display in the FeaturedProducts component
  const { data: nodeProductsResponse, included: nodeProductsIncluded } =
    await getProductsByNode(NODE_ID);

  const featuredNodeProducts = nodeProductsIncluded?.main_images
    ? connectProductsWithMainImages(
        nodeProductsResponse.slice(0, 4), // Only need the first 4 products to feature
        nodeProductsIncluded?.main_images
      )
    : [];

  // Fetching a nodes to display in the NodeDisplay component
  const hierarchies = await getHierarchies();
  const hierarchyChildren =
    hierarchies.length > 0 ? await getHierarchyChildren(hierarchies[0].id) : [];

  // As an example, use first hierarchy's child, if there is one
  const parentNode =
    hierarchyChildren.length > 0 ? hierarchyChildren[0] : undefined;

  const categoryNodes = parentNode ? await getNodeChildren(parentNode?.id) : [];

  // Fetching nodes and hierarchies for statically generated nav
  const buildSiteNavigation = async () => {
    interface ISchema {
      name: string;
      id: string;
      children: ISchema[];
    }

    const createNode = (name: string, id: string, children: ISchema[] = []) => {
      const schema: ISchema = {
        name,
        id,
        children,
      };

      return Object.assign({}, schema);
    };

    // Fetch hierarchies to be used as top level nav
    const hierarchies = await getHierarchies();

    // Construct hierarchy tree, limited to 5 hierarchies at the top level
    const tree = hierarchies
      .slice(0, 4)
      .map((hierarchy) => createNode(hierarchy.attributes.name, hierarchy.id))
      .map(async (hierarchy) => {
        // Fetch first-level nav ('parent nodes') - the direct children of each hierarchy
        const directChildren = await getHierarchyChildren(hierarchy.id);
        // Fetch all nodes in each hierarchy (i.e. all 'child nodes' belonging to a hierarchy)
        const allNodes = await getHierarchyNodes(hierarchy.id);

        // Build 2nd level by finding all 'child nodes' belonging to each first level node
        const directs = directChildren.slice(0, 4).map((child) => {
          const children: ISchema[] = allNodes
            .filter((node) => node?.relationships?.parent.data.id === child.id)
            .map((node) => createNode(node.attributes.name, node.id));

          return createNode(child.attributes.name, child.id, children);
        });

        return { ...hierarchy, children: directs };
      });

    return Promise.all(tree);
  };

  const nav = await buildSiteNavigation();

  return {
    props: {
      staticProducts,
      promotion,
      featuredNodeProducts,
      hierarchies,
      categoryNodes,
      nav,
    },
  };
};

export default Home;
