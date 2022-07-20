import type { GetStaticProps, NextPage } from "next";
import "pure-react-carousel/dist/react-carousel.es.css";

import { chakra } from "@chakra-ui/react";
import { getHierarchies, getHierarchyChildren } from "../services/hierarchy";
import { StaticProduct, staticProducts } from "../lib/product-data";
import ProductShowcaseCarousel from "../components/product/carousel/ProductShowcaseCarousel";
import NodeDisplay from "../components/node/NodeDisplay";
import type { Hierarchy, Node } from "@moltin/sdk";
import { useEffect, useState } from "react";

export interface IHome {
  products: StaticProduct[];
  hierarchies: Hierarchy[];
  parentNode: Node | undefined;
}

const Home: NextPage<IHome> = ({ products, parentNode }) => {
  return (
    <chakra.main py="16">
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
  const hierarchies = await getHierarchies();
  const hierarchyChildren =
    hierarchies.length > 0 ? await getHierarchyChildren(hierarchies[0].id) : [];
  // As an example, use first hierarchy's child, if there is one
  const parentNode =
    hierarchyChildren.length > 0 ? hierarchyChildren[0] : undefined;

  console.clear();
  console.log("getStaticProps - hierarchies ALL", hierarchies);
  return {
    props: {
      products: staticProducts,
      hierarchies,
      parentNode,
    },
  };
};

export default Home;
