import { getAllPCMProducts } from "../services/products";
import { Heading, Grid, GridItem, Box, Divider, Badge } from "@chakra-ui/react";
import type { PcmProduct } from "@moltin/sdk";

interface IProduct {
  products: PcmProduct[];
}

export default function Product({ products }: IProduct) {
  return (
    <div>
      <Heading p="6">All Products</Heading>
      <Grid templateColumns="repeat(5, 1fr)" gap={6} p="6">
        {products.map((product) => {
          return (
            <GridItem key={product.id}>
              <Box
                key={product.id}
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

export async function getStaticProps() {
  const products = await getAllPCMProducts();
  return {
    props: {
      products,
    },
  };
}
