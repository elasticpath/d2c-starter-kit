import type { GetStaticProps, NextPage } from "next";
import "pure-react-carousel/dist/react-carousel.es.css";

import { chakra } from "@chakra-ui/react";
import { getNodes, getHierarchies } from "../services/hierarchy";
import { StaticProduct, staticProducts } from "../lib/product-data";
import ProductShowcaseCarousel from "../components/product/carousel/ProductShowcaseCarousel";
import PromotionBanner, {
  PromotionBannerSpec,
} from "../components/PromotionBanner/PromotionBanner";
import { getPromotionById } from "../services/promotions";
import NodeDisplay from "../components/node/NodeDisplay";
import type { Hierarchy, Node } from "@moltin/sdk";

export interface IHome {
  products: StaticProduct[];
  hierarchies: Hierarchy[];
  nodes?: Node[];
  promotion?: PromotionBannerSpec;
}

const Home: NextPage<IHome> = ({ products, promotion, hierarchies }) => {
  return (
    <chakra.main>
      <PromotionBanner
        promotionSpec={promotion ?? "885709b4-0053-48ee-91a2-bc9f7eb41d27"}
        buttonText="Shop Now"
        buttonLink="/cart"
      />
      <NodeDisplay
        nodeSpec={hierarchies[0].id}
        buttonProps={{ text: "Browse all categories" }}
        title="Shop by Category"
        // nodesArr={nodes}
        // hierarchyId={hierarchies[0].id}
      ></NodeDisplay>
      <ProductShowcaseCarousel products={products} />
    </chakra.main>
  );
};

export const getStaticProps: GetStaticProps<IHome> = async () => {
  const { data: promotion } = await getPromotionById(
    "885709b4-0053-48ee-91a2-bc9f7eb41d27"
  );

  const hierarchies = await getHierarchies();

  console.clear();
  console.log("hierarchies ALL", hierarchies);
  // const nodes = await getNodes(hierarchies[0].id);
  // console.log("returned nodes", nodes);
  return {
    props: {
      products: staticProducts,
      promotion,
      hierarchies,
    },
  };
};

export default Home;
