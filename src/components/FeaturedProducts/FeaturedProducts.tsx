import { Box, Button, Flex, Heading, Image } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getNodesProducts } from "../../services/hierarchy";
import { ProductResponse } from "@moltin/sdk";

interface IFeaturedProductsProps {
  nodeId?: string;
  nodeProducts?: ProductResponse[];
  title: string;
  link: string;
}

const FeaturedProducts = ({
  nodeId,
  nodeProducts = [],
  title,
  link,
}: IFeaturedProductsProps): JSX.Element => {
  const router = useRouter();

  const [products, setProducts] = useState<ProductResponse[]>(nodeProducts);

  const fetchNodeProducts = useCallback(async () => {
    const { data } = await getNodesProducts(nodeId!);
    setProducts(data.slice(0, 4));
  }, [nodeId]);

  useEffect(() => {
    try {
      nodeId && fetchNodeProducts();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, [fetchNodeProducts, nodeId]);

  return (
    <Box w="90%" m="0 auto">
      <Flex justifyContent="space-between">
        <Heading as="h6" size="lg">
          {title}
        </Heading>
        <Button
          color={"#5348CA"}
          variant="link"
          mt="5"
          onClick={() => router.push(link)}
        >
          See everything →
        </Button>
      </Flex>
      <Flex justifyContent="space-around" alignItems="center" mt={6} mb={8}>
        {products.map((product) => (
          <Box key={product.id} textAlign="center">
            <Image
              width={80}
              height={80}
              alt="asd"
              src="https://m.media-amazon.com/images/I/310HiBU8TXL._SY355_.jpg"
            />
            <Box fontSize="xs">{product.attributes.sku}</Box>
            <Box p="2" fontWeight="semibold">
              {product.attributes.name}
            </Box>
            <Box>{product.meta.display_price?.without_tax.formatted}</Box>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default FeaturedProducts;
