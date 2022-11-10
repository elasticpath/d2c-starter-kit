import React, { useCallback, useEffect, useState } from "react";
import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import type { ProductResponse } from "@moltin/sdk";
import type { ParsedUrlQuery } from "querystring";
import { withStoreServerSideProps } from "../../lib/store-wrapper-ssr";
import { ProductResponseWithImage } from "../../lib/product-types";
import SearchBox from "../../components/search/SearchBox";
import {
  getAllProductsFromHierarchy,
  getAllProductsFromNode,
  getNavItemBySlug,
  getNodeBySlugQuery,
} from "../../lib/search-props";
import { useRouter } from "next/router";
import HitsProvider from "../../components/search/HitsProvider";
import Pagination from "../../components/search/Pagination";
import { ShopperCatalogResourcePage } from "@moltin/sdk";
import { usePagination } from "../../lib/use-pagination";
import { useNav } from "../../context/use-nav";

interface IProductsList {
  products: ShopperCatalogResourcePage<ProductResponse>;
}

const mapProductsToHits = (products: ProductResponseWithImage[]) =>
  products.map((product) => ({
    ep_description: product.attributes.description,
    ep_name: product.attributes.name,
    ep_price: {
      USD: {
        formatted_price: product.meta.display_price?.without_tax.formatted,
        ...(product.meta.original_display_price?.without_tax.formatted && {
          sale_prices: {
            original_price: {
              formatted_price:
                product.meta.original_display_price?.without_tax.formatted,
            },
          },
        }),
      },
    },
    ep_sku: product.attributes.sku,
    ep_slug: product.attributes.slug,
    ep_main_image_url: product.main_image?.link.href,
    objectID: product.id,
  }));

export const Search: NextPage<IProductsList> = ({ products }) => {
  const { currentPage, totalPages, onPageChange, offset, onTotalPagesChange } =
    usePagination({
      itemsTotal: products.meta.results.total,
    });
  const { nav } = useNav();
  const [searchQuery, setSearchQuery] = useState("");

  const { query: routeQuery } = useRouter();

  const [hitsState, setHitsState] = useState(mapProductsToHits(products.data));

  const onSearch = useCallback(async () => {
    const nodeQuery = routeQuery.node || [];
    if (!Array.isArray(nodeQuery)) return;

    let products: ShopperCatalogResourcePage<ProductResponse>;

    const queryOptions = {
      offset,
      ...(searchQuery && { q: searchQuery }),
    };
    if (nodeQuery.length === 1) {
      const hierarchy = getNavItemBySlug(nav, nodeQuery[0]);
      if (!hierarchy) return;
      products = await getAllProductsFromHierarchy(hierarchy.id, queryOptions);
    } else {
      const node = getNodeBySlugQuery(nodeQuery, nav);
      if (!node) return;
      products = await getAllProductsFromNode(node.id, queryOptions);
    }
    onTotalPagesChange(products.meta.results.total);
    setHitsState(mapProductsToHits(products.data));
  }, [offset, searchQuery, nav, routeQuery.node, onTotalPagesChange]);

  useEffect(() => {
    onSearch();
  }, [currentPage, onSearch, searchQuery]);

  return (
    <Box px={4} py={8}>
      <Heading p="6">Category</Heading>
      <Grid gap={6} p="6">
        <SearchBox onSearch={(q) => setSearchQuery(q)} />
        <Grid templateColumns={{ base: "1fr", md: "auto 1fr" }} gap={8}>
          <GridItem
            minWidth={{ base: "3xs", lg: "2xs" }}
            display={{ base: "none", md: "block" }}
          >
            <Heading as="h3" size="sm" pb={2}>
              Category
            </Heading>
            {`< HierarchicalMenu >`}
          </GridItem>

          <GridItem>
            <HitsProvider hits={hitsState} />
            <Box py={10}>
              <Pagination
                currentPage={currentPage}
                onPageChange={onPageChange}
                totalPages={totalPages}
              />
            </Box>
          </GridItem>
        </Grid>
      </Grid>
    </Box>
  );
};

interface NodeSearchQuery extends ParsedUrlQuery {
  node: string[];
}

export const getServerSideProps = withStoreServerSideProps<
  ProductResponse[],
  NodeSearchQuery
  //@ts-ignore
>(async ({ query }, nav) => {
  const nodeQuery = query.node || [];
  if (!Array.isArray(nodeQuery)) return;

  let products: ShopperCatalogResourcePage<ProductResponse>;

  if (nodeQuery.length === 1) {
    const hierarchyId = getNavItemBySlug(nav, nodeQuery[0])!.id;
    products = await getAllProductsFromHierarchy(hierarchyId);
  } else {
    const node = getNodeBySlugQuery(nodeQuery, nav);
    if (!node) {
      return {
        notFound: true,
      };
    }
    products = await getAllProductsFromNode(node.id);
  }

  return {
    props: {
      products,
    },
  };
});

export default Search;
