import { NavigationNode } from "./build-site-navigation";
import {
  getHierarchyProducts,
  getProductsByNode,
  IApiOptions,
} from "../services/hierarchy";
import { connectProductsWithMainImages } from "./product-util";

export const getAllProductsFromHierarchy = async (
  id: string,
  options: IApiOptions = {}
) => {
  const response = await getHierarchyProducts(id, options);

  const { data: productsResponse, included } = response;

  const productsWithImages = included?.main_images
    ? connectProductsWithMainImages(productsResponse, included?.main_images)
    : productsResponse;
  return { ...response, data: productsWithImages };
};

export const getAllProductsFromNode = async (id: string, q?: string) => {
  const response = await getProductsByNode(id, { q });

  const { data: productsResponse, included } = response;

  const productsWithImages = included?.main_images
    ? connectProductsWithMainImages(productsResponse, included?.main_images)
    : productsResponse;
  return { ...response, data: productsWithImages };
};

export const getNodeBySlugQuery = (
  slugQuery: string[],
  nav: NavigationNode[]
) => {
  let foundNode: NavigationNode | undefined;
  slugQuery.forEach((slug) => {
    const navNode = foundNode ? foundNode.children : nav;
    foundNode = getNavItemBySlug(navNode, slug);
  });
  return foundNode;
};

export const getNavItemBySlug = (nav: NavigationNode[], slug: string) =>
  nav.find((el) => el.slug === slug);
