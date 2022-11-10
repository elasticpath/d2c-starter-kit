import type { Node, Hierarchy, ProductResponse } from "@moltin/sdk";
import { Moltin as EPCCClient } from "@moltin/sdk";

import { ShopperCatalogResourcePage } from "@moltin/sdk";
import { getEpccImplicitClient } from "../lib/epcc-implicit-client";

export interface IApiOptions {
  limit?: number;
  offset?: number;
  q?: string;
}

export async function getHierarchies(
  client?: EPCCClient
): Promise<Hierarchy[]> {
  const result = await (
    client ?? getEpccImplicitClient()
  ).ShopperCatalog.Hierarchies.All();
  return result.data;
}

export async function getHierarchyChildren(
  hierarchyId: string,
  client?: EPCCClient
): Promise<Node[]> {
  const result = await (
    client ?? getEpccImplicitClient()
  ).ShopperCatalog.Hierarchies.GetHierarchyChildren({
    hierarchyId,
  });
  return result.data;
}

export async function getHierarchyNodes(
  hierarchyId: string,
  client?: EPCCClient
): Promise<Node[]> {
  const result = await (
    client ?? getEpccImplicitClient()
  ).ShopperCatalog.Hierarchies.GetHierarchyNodes({
    hierarchyId,
  });

  return result.data;
}

export async function getHierarchyProducts(
  hierarchyId: string,
  { offset = 0, limit = 4, q }: IApiOptions,
  client?: EPCCClient
): Promise<ShopperCatalogResourcePage<ProductResponse>> {
  return (client ?? getEpccImplicitClient()).ShopperCatalog.Products.With([
    "main_image",
    "files",
  ])
    .Offset(offset)
    .Limit(limit)
    .Filter(q ? { eq: { name: q } } : {})
    .GetProductsByHierarchy({
      hierarchyId,
    });
}

export async function getNodeChildren(
  nodeId: string,
  client?: EPCCClient
): Promise<Node[]> {
  const result = await (
    client ?? getEpccImplicitClient()
  ).ShopperCatalog.Nodes.GetNodeChildren({
    nodeId,
  });
  return result.data;
}

export async function getProductsByNode(
  nodeId: string,
  { offset = 0, limit = 4, q }: IApiOptions = {},
  client?: EPCCClient
): Promise<ShopperCatalogResourcePage<ProductResponse>> {
  return (client ?? getEpccImplicitClient()).ShopperCatalog.Products.With([
    "main_image",
    "files",
  ])
    .Offset(offset)
    .Limit(limit)
    .Filter(q ? { eq: { name: q } } : {})
    .GetProductsByNode({
      nodeId,
    });
}
