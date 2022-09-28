import { Box, Heading, Tag, Flex } from "@chakra-ui/react";
import type { ProductResponse } from "@moltin/sdk";
import { changingSkuStyle } from "../../lib/product-util";
import Price from "./Price";
import StrikePrice from "./StrikePrice";
import { useProduct } from "../../context/use-product-hook";

interface IProductSummary {
  product: ProductResponse;
}

const ProductSummary = ({ product }: IProductSummary): JSX.Element => {
  const { state } = useProduct();
  const {
    attributes,
    meta: { display_price, original_display_price },
  } = product;

  return (
    <Box
      as="header"
      {...(state.kind === "changing-product-state" ? changingSkuStyle : {})}
    >
      <Heading
        lineHeight={1.1}
        fontWeight={600}
        fontSize={{ base: "xl", sm: "3xl", lg: "4xl" }}
      >
        {attributes.name}
      </Heading>
      <Tag marginTop={4}> {attributes.sku}</Tag>
      {display_price && (
        <Flex alignItems="center">
          <Price
            price={display_price.without_tax.formatted}
            currency={display_price.without_tax.currency}
          />
          {original_display_price && (
            <StrikePrice
              price={original_display_price.without_tax.formatted}
              currency={original_display_price.without_tax.currency}
            />
          )}
        </Flex>
      )}
    </Box>
  );
};

export default ProductSummary;
