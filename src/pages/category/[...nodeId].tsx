import React from "react";
import Link from "next/link";
import { Badge, Box, Divider, Grid, GridItem, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import { GetStaticPaths, GetStaticProps } from "next";
import type { ProductResponse, ResourceList } from "@moltin/sdk";
import type { ParsedUrlQuery } from "querystring";
import {
  getHierarchies,
  getHierarchyChildren,
  getNodesProducts,
} from "../../services/hierarchy";

interface CatagoryRouterQuery extends ParsedUrlQuery {
  nodeId: string;
}

interface ICatagory {
  products: ResourceList<ProductResponse>;
}

export const Category: NextPage<ICatagory> = ({ products }) => {
  return (
    <div>
      <Heading p="6">Category</Heading>
      <Grid templateColumns="repeat(5, 1fr)" gap={6} p="6">
        {products.data.map((product) => {
          return (
            <Link href={`/products/${product.id}`} key={product.id} passHref>
              <GridItem>
                <Box
                  maxW="sm"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                >
                  <Box p="6">{product.attributes.name}</Box>
                  <Divider />
                  <Box p="6">
                    <Box display="flex" alignItems="baseline">
                      <Badge borderRadius="full" px="2" colorScheme="teal">
                        {product.attributes.status}
                      </Badge>
                      <Box
                        color="gray.500"
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        ml="2"
                      >
                        {product.attributes.sku}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </GridItem>
            </Link>
          );
        })}
      </Grid>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths<CatagoryRouterQuery> = async () => {
  const hierarchies = await getHierarchies();
  const nodesRequest = hierarchies.map(({ id }) => getHierarchyChildren(id));
  const nodes = await Promise.all(nodesRequest);
  const paths = nodes.flat().map((node) => {
    return `/category/${node.id}`;
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  ICatagory,
  CatagoryRouterQuery
> = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
    };
  }
  const products = await getNodesProducts(params.nodeId);
  return {
    props: {
      products,
    },
  };
};

export default Category;
