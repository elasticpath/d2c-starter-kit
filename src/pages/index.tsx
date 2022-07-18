import type { GetStaticProps, NextPage } from "next";
import "pure-react-carousel/dist/react-carousel.es.css";

import { chakra } from "@chakra-ui/react";
import { getNodes, getHierarchies } from "../services/hierarchy";
import { StaticProduct, staticProducts } from "../lib/product-data";
import ProductShowcaseCarousel from "../components/product/carousel/ProductShowcaseCarousel";
import NodeDisplay from "../components/node/NodeDisplay";
import type { Hierarchy, Node } from "@moltin/sdk";

export interface IHome {
  products: StaticProduct[];
  hierarchies: Hierarchy[];
  nodes?: Node[];
}

const Home: NextPage<IHome> = ({ products, hierarchies }) => {
  return (
    <chakra.main py="16">
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
  const hierarchies = await getHierarchies();

  console.clear();
  console.log("hierarchies ALL", hierarchies);
  // const nodes = await getNodes(hierarchies[0].id);
  // console.log("returned nodes", nodes);
  return {
    props: {
      products: staticProducts,
      hierarchies,
    },
  };
};

export default Home;
