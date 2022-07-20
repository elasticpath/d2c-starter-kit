import type { GetStaticProps, NextPage } from "next";
import type { Hierarchy, Node } from "@moltin/sdk";
import "pure-react-carousel/dist/react-carousel.es.css";

import { chakra } from "@chakra-ui/react";
import { getHierarchies, getNodes } from "../services/hierarchy";
import { StaticProduct, staticProducts } from "../lib/product-data";
import ProductShowcaseCarousel from "../components/product/carousel/ProductShowcaseCarousel";
import PromotionBanner, {
  PromotionBannerSpec,
} from "../components/PromotionBanner/PromotionBanner";
import { getPromotionById } from "../services/promotions";
import NodeDisplay from "../components/node/NodeDisplay";

export interface IHome {
  products: StaticProduct[];
  hierarchies?: Hierarchy[];
  parentNode: Node | undefined;
  nodes?: Node[];
  promotion?: PromotionBannerSpec;
}

const Home: NextPage<IHome> = ({ products, promotion, parentNode }) => {
  return (
    <chakra.main>
      <PromotionBanner
        promotionSpec={promotion ?? "885709b4-0053-48ee-91a2-bc9f7eb41d27"}
        buttonText="Shop Now"
        buttonLink="/cart"
      />
      {parentNode && (
        <NodeDisplay
          nodeSpec={{
            type: "node",
            data: parentNode.id,
          }}
          buttonProps={{ text: "Browse all categories", link: "/categories" }}
          title="Shop by Category"
        ></NodeDisplay>
      )}
      <ProductShowcaseCarousel products={products} />
    </chakra.main>
  );
};

export const getStaticProps: GetStaticProps<IHome> = async () => {
  const { data: promotion } = await getPromotionById(
    "885709b4-0053-48ee-91a2-bc9f7eb41d27"
  );

  const hierarchies = await getHierarchies();
  const hierarchyChildren =
    hierarchies.length > 0 ? await getNodes(hierarchies[0].id) : [];
  // As an example, use first hierarchy's child, if there is one
  const parentNode =
    hierarchyChildren.length > 0 ? hierarchyChildren[0] : undefined;

  console.clear();
  console.log("getStaticProps - hierarchies ALL", hierarchies);
  return {
    props: {
      products: staticProducts,
      promotion,
      hierarchies,
      parentNode,
    },
  };
};

export default Home;
