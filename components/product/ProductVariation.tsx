import { Button, Flex, Grid } from "@chakra-ui/react";

interface ProductVariationOption {
  id: string;
  description: string;
  name: string;
}

export type UpdateOptionHandler = (
  variationId: string
) => (optionId: string) => void;

interface IProductVariation {
  variation: {
    id: string;
    name: string;
    options: ProductVariationOption[];
  };
  updateOptionHandler: UpdateOptionHandler;
  selectedOptionId?: string;
}

const ProductVariation = ({
  variation,
  selectedOptionId,
  updateOptionHandler,
}: IProductVariation): JSX.Element => {
  return (
    <Grid>
      <h2>{variation.name}</h2>
      <Flex gap={2}>
        {variation.options.map((o) => (
          <Button
            key={o.id}
            bgColor={o.id === selectedOptionId ? "pink.500" : ""}
            onClick={() => updateOptionHandler(variation.id)(o.id)}
          >
            {o.name}
          </Button>
        ))}
      </Flex>
    </Grid>
  );
};

export default ProductVariation;
