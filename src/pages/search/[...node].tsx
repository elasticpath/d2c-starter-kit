import React, { useState } from "react";
import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import type { ProductResponse } from "@moltin/sdk";
import type { ParsedUrlQuery } from "querystring";
import { withStoreServerSideProps } from "../../lib/store-wrapper-ssr";
import { ProductResponseWithImage } from "../../lib/product-types";
import SearchBox from "../../components/search/SearchBox";
import {
  getAllProductsFromHierarchy,
  getNavItemBySlug,
  getNodeBySlugQuery,
} from "../../lib/pure-search-props";
import { fetchFeaturedProducts } from "../../components/featured-products/fetchFeaturedProducts";
import { useRouter } from "next/router";
import { buildSiteNavigation } from "../../lib/build-site-navigation";
import HitsProvider from "../../components/search/HitsProvider";

interface IProductsList {
  products: ProductResponseWithImage[];
}

const mapProductsToHits = (products: ProductResponseWithImage[]) =>
  products.map((product) => ({
    ep_categories: {},
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
    ep_image_url: product.main_image?.link.href,
    objectID: product.id,
  }));

export const PureSearch: NextPage<IProductsList> = (props) => {
  const { query } = useRouter();

  const [hitsState, setHitsState] = useState(mapProductsToHits(props.products));

  const onSearch = async (q: string) => {
    const nav = await buildSiteNavigation();
    const nodeSlug = query.node?.[0];

    if (!nodeSlug) return;
    const hierarchyId = getNavItemBySlug(nav, nodeSlug)!.id;
    const products = await getAllProductsFromHierarchy(hierarchyId, q);
    setHitsState(mapProductsToHits(products));
  };

  return (
    <Box px={4} py={8}>
      <Heading p="6">Category</Heading>
      <Grid gap={6} p="6">
        <SearchBox onSearch={onSearch} />
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
            {/*//@ts-ignore*/}
            <HitsProvider hits={hitsState} />
            <Box py={10}>{/*<Pagination />*/}</Box>
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

  let products: ProductResponse[];

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
    products = await fetchFeaturedProducts(node.id);
  }

  return {
    props: {
      products,
    },
  };
});

export default PureSearch;
