import React, { useEffect, useState } from "react";
import { getNode, getNodesProducts } from "../../../services/services";
import { useRouter } from "next/router";
import { Heading, Grid, GridItem, Box, Divider, Badge } from "@chakra-ui/react";

export default function Product() {
  const router = useRouter();
  const { cid, pid } = router.query;
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    async function fetchShippingMethods() {
      const productsList = await getNodesProducts(cid, pid);
      const node = await getNode(cid, pid);
      setCategory(node);

      // @ts-ignore
      setProducts(productsList.data);
    }
    try {
      fetchShippingMethods();
    } catch (error) {
      console.log(error);
    }
  }, [pid, cid]);

  return (
    <div>
      <Heading p="6">Category</Heading>
      <Grid templateColumns="repeat(5, 1fr)" gap={6} p="6">
        {products.map((product) => {
          return (
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
          );
        })}
      </Grid>
    </div>
  );
}
