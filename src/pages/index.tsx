import type { GetStaticProps, NextPage } from "next";
import "pure-react-carousel/dist/react-carousel.es.css";
import type { File } from "@moltin/sdk";
import { chakra } from "@chakra-ui/react";
import { StaticProduct, staticProducts } from "../lib/product-data";
import ProductShowcaseCarousel from "../components/product/carousel/ProductShowcaseCarousel";
import PromotionBanner, {
  PromotionBannerSpec,
} from "../components/PromotionBanner/PromotionBanner";
import { getPromotionById } from "../services/promotions";
import FeaturedProducts from "../components/FeaturedProducts/FeaturedProducts";
import { getProductsByNode } from "../services/hierarchy";
import { ProductResponse } from "@moltin/sdk";
import { connectProductsWithMainImages } from "../lib/product-util";

export interface IHome {
  staticProducts: StaticProduct[];
  promotion?: PromotionBannerSpec;
  nodeProducts?: ProductResponse[];
  nodeProductsImages?: File[];
}

const Home: NextPage<IHome> = ({
  staticProducts,
  promotion,
  nodeProducts,
  nodeProductsImages,
}) => {
  const nodeId = "4cb5301a-9da3-41a4-9402-c104ed1c2569";
  return (
    <chakra.main>
      <PromotionBanner
        promotionSpec={promotion ?? "885709b4-0053-48ee-91a2-bc9f7eb41d27"}
        buttonText="Shop Now"
        buttonLink="/cart"
      />
      <FeaturedProducts
        title="Trending Products"
        link={`/category/${nodeId}`}
        nodeId={nodeId}
        nodeProducts={nodeProducts}
        nodeProductsImages={nodeProductsImages}
      />
      <ProductShowcaseCarousel products={staticProducts} />
    </chakra.main>
  );
};

export const getStaticProps: GetStaticProps<IHome> = async () => {
  const { data: promotion } = await getPromotionById(
    "885709b4-0053-48ee-91a2-bc9f7eb41d27"
  );
  const { data: nodeProductsResponse, included: nodeProductsIncluded } =
    await getProductsByNode("4cb5301a-9da3-41a4-9402-c104ed1c2569");
  let nodeProducts = nodeProductsResponse.slice(0, 4);
  if (nodeProductsIncluded?.main_images) {
    nodeProducts = connectProductsWithMainImages(
      nodeProducts,
      nodeProductsIncluded?.main_images
    );
  }
  return {
    props: {
      staticProducts,
      promotion,
      nodeProducts: nodeProducts,
    },
  };
};

export default Home;
