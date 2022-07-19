import type { GetStaticProps, NextPage } from "next";
import "pure-react-carousel/dist/react-carousel.es.css";

import { chakra } from "@chakra-ui/react";
import { StaticProduct, staticProducts } from "../lib/product-data";
import ProductShowcaseCarousel from "../components/product/carousel/ProductShowcaseCarousel";
import PromotionBanner, {
  PromotionBannerSpec,
} from "../components/PromotionBanner/PromotionBanner";
import { getPromotionById } from "../services/promotions";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import { getNodesProducts } from "../services/hierarchy";
import { ProductResponse } from "@moltin/sdk";

export interface IHome {
  products: StaticProduct[];
  promotion?: PromotionBannerSpec;
  nodeProducts?: ProductResponse[];
}

const Home: NextPage<IHome> = ({ products, promotion, nodeProducts }) => {
  const nodeId = "b9c5177b-7793-4854-9fef-916534c047af";
  return (
    <chakra.main>
      <PromotionBanner
        promotionSpec={promotion ?? "885709b4-0053-48ee-91a2-bc9f7eb41d27"}
        buttonText="Shop Now"
        buttonLink="/cart"
      />
      <FeaturedProducts
        nodeId={nodeId}
        nodeProducts={nodeProducts}
        title="Trending Products"
        link={`/category/${nodeId}`}
      />
      <ProductShowcaseCarousel products={products} />
    </chakra.main>
  );
};

export const getStaticProps: GetStaticProps<IHome> = async () => {
  const { data: promotion } = await getPromotionById(
    "885709b4-0053-48ee-91a2-bc9f7eb41d27"
  );
  const { data: nodeProducts } = await getNodesProducts(
    "b9c5177b-7793-4854-9fef-916534c047af"
  );
  return {
    props: {
      products: staticProducts,
      promotion,
      nodeProducts: nodeProducts.slice(0, 4),
    },
  };
};

export default Home;
