import {
  getProductsByNode,
  getHierarchies,
  getHierarchyChildren,
  getNodeChildren,
} from "../services/hierarchy";
import { getPromotionById } from "../services/promotions";
import { connectProductsWithMainImages } from "./product-util";

const NODE_ID = process.env.NEXT_PUBLIC_DEMO_NODE_ID || "";
const PROMOTION_ID = process.env.NEXT_PUBLIC_DEMO_PROMO_ID || "";

// Fetching the data for a specific promotion for the home page PromotionBanner
export const buildStaticPromotion = async () => {
  const { data } = await getPromotionById(PROMOTION_ID);
  return data;
};

// Fetching the first 4 products of a node to display in the FeaturedProducts component
export const buildStaticFeaturedProducts = async () => {
  const { data: nodeProductsResponse, included: nodeProductsIncluded } =
    await getProductsByNode(NODE_ID);

  return nodeProductsIncluded?.main_images
    ? connectProductsWithMainImages(
        nodeProductsResponse.slice(0, 4), // Only need the first 4 products to feature
        nodeProductsIncluded?.main_images
      )
    : nodeProductsResponse;
};

// Fetching nodes to display in the NodeDisplay component
export const buildStaticFeaturedNodes = async () => {
  const hierarchies = await getHierarchies();
  const hierarchyChildren =
    hierarchies.length > 0 ? await getHierarchyChildren(hierarchies[0].id) : [];

  // As an example, use first hierarchy's child, if there is one
  const parentNode =
    hierarchyChildren.length > 0 ? hierarchyChildren[0] : undefined;

  return parentNode ? await getNodeChildren(parentNode?.id) : [];
};
