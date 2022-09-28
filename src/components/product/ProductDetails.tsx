import {
  Box,
  Text,
  Stack,
  StackDivider,
  useColorModeValue,
} from "@chakra-ui/react";
import type { ProductResponse } from "@moltin/sdk";
import { changingSkuStyle } from "../../lib/product-util";
import { useProduct } from "../../context/use-product-hook";

interface IProductDetails {
  product: ProductResponse;
}

const ProductDetails = ({ product }: IProductDetails): JSX.Element => {
  const { state } = useProduct();
  return (
    <Stack
      spacing={{ base: 4, sm: 6 }}
      direction="column"
      divider={
        <StackDivider borderColor={useColorModeValue("gray.200", "gray.800")} />
      }
      {...(state.kind === "changing-product-state" ? changingSkuStyle : {})}
    >
      <Box>
        <Text
          fontSize={{ base: "16px", lg: "18px" }}
          color={useColorModeValue("blue.500", "blue.300")}
          fontWeight="500"
          textTransform="uppercase"
          mb="4"
        >
          Product Details
        </Text>
        <Text>{product.attributes.description}</Text>
      </Box>
    </Stack>
  );
};

export default ProductDetails;
