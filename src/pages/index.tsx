import type { GetStaticProps, NextPage } from "next";
import "pure-react-carousel/dist/react-carousel.es.css";

import { chakra } from "@chakra-ui/react";
import { StaticProduct, staticProducts } from "../lib/product-data";
import ProductShowcaseCarousel from "../components/product/carousel/ProductShowcaseCarousel";
import PromotionBanner, {
  PromotionBannerSpec,
} from "../components/PromotionBanner/PromotionBanner";
import { getPromotionById } from "../services/promotions";

export interface IHome {
  products: StaticProduct[];
  promotion?: PromotionBannerSpec;
}

const Home: NextPage<IHome> = ({ products, promotion }) => {
  return (
    <chakra.main>
      <PromotionBanner
        promotionSpec={promotion ?? "885709b4-0053-48ee-91a2-bc9f7eb41d27"}
        buttonText="Shop Now"
        buttonLink="/cart"
      />
      <ProductShowcaseCarousel products={products} />
    </chakra.main>
  );
};

export const getStaticProps: GetStaticProps<IHome> = async () => {
  const { data: promotion } = await getPromotionById(
    "885709b4-0053-48ee-91a2-bc9f7eb41d27"
  );
  return {
    props: {
      products: staticProducts,
      promotion,
    },
  };
};

export default Home;
