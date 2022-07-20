import { Box, Button, Flex, Heading, Image } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getProductsByNode } from "../../services/hierarchy";
import { ProductResponse } from "@moltin/sdk";
import type { File } from "@moltin/sdk";

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
  const [mainImages, setMainImages] = useState<File[]>([]);

  const fetchNodeProducts = useCallback(async () => {
    const { data, included } = await getProductsByNode(nodeId!);
    setProducts(data.slice(0, 4));
    if (included?.main_images) {
      setMainImages(included.main_images);
    }
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
        {products.map((product) => {
          const productMainImageId = product.relationships.main_image?.data?.id;
          const productMainImage = mainImages.find(
            (image) => image.id === productMainImageId
          );
          return (
            <Box key={product.id} textAlign="center">
              <Image
                width={290}
                height={290}
                alt={productMainImage?.file_name || "Empty"}
                src={productMainImage?.link.href}
                fallbackSrc="/images/image_placeholder.svg"
                borderRadius={5}
              />

              <Box fontSize={14} mt={8} color="gray.500">
                {product.attributes.sku}
              </Box>
              <Box p="2" fontWeight="semibold">
                {product.attributes.name}
              </Box>
              <Box>{product.meta.display_price?.without_tax.formatted}</Box>
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
};

export default FeaturedProducts;
