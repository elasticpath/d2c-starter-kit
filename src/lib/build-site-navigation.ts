import type { Hierarchy } from "@moltin/sdk";
import {
  getHierarchies,
  getHierarchyChildren,
  getHierarchyNodes,
} from "../services/hierarchy";

interface ISchema {
  name: string;
  id: string;
  children: ISchema[];
}

export interface NavigationNode {
  name: string;
  id: string;
  children: NavigationNode[];
}

export async function buildSiteNavigation(): Promise<NavigationNode[]> {
  // Fetch hierarchies to be used as top level nav
  const hierarchies = await getHierarchies();
  return constructTree(hierarchies);
}

/**
 * Construct hierarchy tree, limited to 5 hierarchies at the top level
 */
function constructTree(hierarchies: Hierarchy[]): Promise<NavigationNode[]> {
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
}

function createNode(name: string, id: string, children: ISchema[] = []) {
  const schema: ISchema = {
    name,
    id,
    children,
  };

  return Object.assign({}, schema);
}
