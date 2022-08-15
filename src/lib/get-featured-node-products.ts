import { getProductsByNode } from "../services/hierarchy";
import { ProductResponseWithImage } from "./product-types";
import { connectProductsWithMainImages } from "./product-util";

export interface Featured {
  featuredNodeProducts: ProductResponseWithImage[];
  nodeId: string;
}

export async function getFeaturedNodeProducts(
  nodeId: string
): Promise<Featured> {
  const { data: nodeProductsResponse, included: nodeProductsIncluded } =
    await getProductsByNode(nodeId);
  const featuredNodeProducts = nodeProductsIncluded?.main_images
    ? connectProductsWithMainImages(
        nodeProductsResponse.slice(0, 4), // Only need the first 4 products to feature
        nodeProductsIncluded?.main_images
      )
    : [];
  return {
    nodeId,
    featuredNodeProducts,
  };
}
