import { NavigationNode } from "./build-site-navigation";
import { getHierarchyProducts } from "../services/hierarchy";
import { connectProductsWithMainImages } from "./product-util";

export const getAllProductsFromHierarchy = async (id: string, q?: string) => {
  const { data: productsResponse, included: productsIncluded } =
    await getHierarchyProducts(id, q);

  return productsIncluded?.main_images
    ? connectProductsWithMainImages(
        productsResponse,
        productsIncluded?.main_images
      )
    : productsResponse;
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
