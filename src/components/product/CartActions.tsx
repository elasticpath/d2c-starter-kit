import { useColorModeValue, Flex, Button } from "@chakra-ui/react";
import { changingSkuStyle } from "../../lib/product-util";
import { useProduct } from "../../context/use-product-hook";

interface ICartActions {
  handleAddToCart: () => void;
}

const CartActions = ({ handleAddToCart }: ICartActions): JSX.Element => {
  const { state } = useProduct();
  return (
    <Flex
      gap={10}
      {...(state.kind === "changing-product-state" ? changingSkuStyle : {})}
    >
      <Button
        disabled={state.kind === "changing-product-state"}
        rounded="md"
        w="full"
        mt={4}
        py="7"
        bg={useColorModeValue("blue.900", "blue.50")}
        color={useColorModeValue("white", "gray.900")}
        textTransform="uppercase"
        _hover={{
          transform: "translateY(2px)",
          boxShadow: "lg",
        }}
        onClick={handleAddToCart}
      >
        Add to cart
      </Button>
    </Flex>
  );
};

export default CartActions;
