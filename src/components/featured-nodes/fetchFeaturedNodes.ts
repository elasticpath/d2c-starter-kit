// Fetching nodes to display in the NodeDisplay component
import {
  getHierarchies,
  getHierarchyChildren,
  getNodeChildren,
} from "../../services/hierarchy";

export const fetchFeaturedNodes = async () => {
  const hierarchies = await getHierarchies();
  const hierarchyChildren =
    hierarchies.length > 0 ? await getHierarchyChildren(hierarchies[0].id) : [];

  // As an example, use first hierarchy's child, if there is one
  const parentNode =
    hierarchyChildren.length > 0 ? hierarchyChildren[0] : undefined;

  return parentNode ? await getNodeChildren(parentNode?.id) : [];
};
