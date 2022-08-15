import {
  getProductsByNode,
  getHierarchies,
  getHierarchyChildren,
  getNodeChildren,
  getHierarchyNodes,
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

// Fetching nodes and hierarchies for statically generated nav
export const buildSiteNavigation = async () => {
  interface ISchema {
    name: string;
    id: string;
    children: ISchema[];
  }

  const createNode = (name: string, id: string, children: ISchema[] = []) => {
    const schema: ISchema = {
      name,
      id,
      children,
    };

    return Object.assign({}, schema);
  };

  // Fetch hierarchies to be used as top level nav
  const hierarchies = await getHierarchies();

  // Construct hierarchy tree, limited to 5 hierarchies at the top level
  const tree = hierarchies
    .slice(0, 4)
    .map((hierarchy) => createNode(hierarchy.attributes.name, hierarchy.id))
    .map(async (hierarchy) => {
      // Fetch first-level nav ('parent nodes') - the direct children of each hierarchy
      const directChildren = await getHierarchyChildren(hierarchy.id);
      // Fetch all nodes in each hierarchy (i.e. all 'child nodes' belonging to a hierarchy)
      const allNodes = await getHierarchyNodes(hierarchy.id);

      // Build 2nd level by finding all 'child nodes' belonging to each first level node
      const directs = directChildren.slice(0, 4).map((child) => {
        const children: ISchema[] = allNodes
          .filter((node) => node?.relationships?.parent.data.id === child.id)
          .map((node) => createNode(node.attributes.name, node.id));

        return createNode(child.attributes.name, child.id, children);
      });

      return { ...hierarchy, children: directs };
    });

  return Promise.all(tree);
};
