import type { GetStaticProps, NextPage } from "next";
import "pure-react-carousel/dist/react-carousel.es.css";

import { chakra } from "@chakra-ui/react";
import { StaticProduct, staticProducts } from "../lib/product-data";
import ProductShowcaseCarousel from "../components/product/carousel/ProductShowcaseCarousel";

export interface IHome {
  products: StaticProduct[];
}

const Home: NextPage<IHome> = ({ products }) => {
  return (
    <chakra.main py="16">
      <ProductShowcaseCarousel products={products} />
    </chakra.main>
  );
};

export const getStaticProps: GetStaticProps<IHome> = async () => {
  return {
    props: {
      products: staticProducts,
    },
  };
};

export default Home;
