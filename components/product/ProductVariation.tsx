import { Button, Flex, Grid } from "@chakra-ui/react";

interface ProductVariationOption {
  id: string;
  description: string;
  name: string;
}

interface IProductVariation {
  variation: {
    id: string;
    name: string;
    options: ProductVariationOption[];
  };
}

const ProductVariation = ({ variation }: IProductVariation): JSX.Element => {
  return (
    <Grid>
      <h2>{variation.name}</h2>
      <Flex gap={2}>
        {variation.options.map((o) => (
          <Button key={o.id}>{o.name}</Button>
        ))}
      </Flex>
    </Grid>
  );
};

export default ProductVariation;
