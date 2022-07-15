import type { GetStaticProps, NextPage } from "next";
import "pure-react-carousel/dist/react-carousel.es.css";

import { chakra } from "@chakra-ui/react";
import { StaticProduct, staticProducts } from "../lib/product-data";
import ProductShowcaseCarousel from "../components/product/carousel/ProductShowcaseCarousel";
import PromotionBanner from "../components/PromotionBanner/PromotionBanner";

export interface IHome {
  products: StaticProduct[];
}

const Home: NextPage<IHome> = ({ products }) => {
  return (
    <chakra.main>
      <PromotionBanner
        promotionId="885709b4-0053-48ee-91a2-bc9f7eb41d27"
        buttonText="Shop Now"
        buttonLink="http://localhost:3000/cart"
      />
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
