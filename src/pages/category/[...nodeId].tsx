import React from "react";
import Link from "next/link";
import { Badge, Box, Divider, Grid, GridItem, Heading } from "@chakra-ui/react";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import type { ParsedUrlQuery } from "querystring";
import { getHierarchies, getNode, getNodes } from "../../services/hierarchy";
import { Configure, useHits } from "react-instantsearch-hooks-web";
import { Node } from "@moltin/sdk";
import { SearchHit } from "../../components/search/SearchHit";
import Pagination from "../../components/search/Pagination";

interface CatagoryRouterQuery extends ParsedUrlQuery {
  nodeId: string;
}

interface ICatagory {
  category: Node;
}

export const Category: NextPage<ICatagory> = ({ category }) => {
  const { hits } = useHits<SearchHit>();

  return (
    <div>
      <Heading p="6">Category</Heading>
      {category ? (
        <>
          <Configure
            filters={`ep_category_page_id:\"${category?.attributes.name}\"`}
          />
          <Grid templateColumns="repeat(5, 1fr)" gap={6} p="6">
            {hits.map(({ objectID, ep_name, ep_sku, ep_slug }) => {
              return (
                <Link
                  href={`/products/${ep_slug}/${objectID}`}
                  key={objectID}
                  passHref
                >
                  <GridItem>
                    <Box
                      maxW="sm"
                      borderWidth="1px"
                      borderRadius="lg"
                      overflow="hidden"
                    >
                      <Box p="6">{ep_name}</Box>
                      <Divider />
                      <Box p="6">
                        <Box display="flex" alignItems="baseline">
                          <Badge borderRadius="full" px="2" colorScheme="teal">
                            live
                          </Badge>
                          <Box
                            color="gray.500"
                            fontWeight="semibold"
                            letterSpacing="wide"
                            fontSize="xs"
                            textTransform="uppercase"
                            ml="2"
                          >
                            {ep_sku}
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </GridItem>
                </Link>
              );
            })}
          </Grid>
          <Box mb={6}>
            <Pagination />
          </Box>
        </>
      ) : null}
    </div>
  );
};

export const getStaticPaths: GetStaticPaths<CatagoryRouterQuery> = async () => {
  const hierarchies = await getHierarchies();
  const nodesRequest = hierarchies.map(({ id }) => getNodes(id));
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

  const categoryRes = await getNode(params.nodeId);
  return {
    props: {
      category: categoryRes.data,
    },
  };
};

export default Category;
