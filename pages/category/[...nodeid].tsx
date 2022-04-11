import React, { useEffect, useState } from "react";
import { getNodesProducts } from "../../services/hierarchy";
import { useRouter } from "next/router";
import Link from "next/link";
import { Heading, Grid, GridItem, Box, Divider, Badge } from "@chakra-ui/react";

export default function Category() {
  const router = useRouter();
  const { nodeid } = router.query;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchNodesProducts() {
      const productsList = await getNodesProducts(nodeid);
      // @ts-ignore
      setProducts(productsList.data);
    }
    try {
      fetchNodesProducts();
    } catch (error) {
      console.log(error);
    }
  }, [nodeid]);

  return (
    <div>
      <Heading p="6">Category</Heading>
      <Grid templateColumns="repeat(5, 1fr)" gap={6} p="6">
        {products.map((product) => {
          return (
            <Link href={`/products/${product.id}`} key={product.id}>
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
}
