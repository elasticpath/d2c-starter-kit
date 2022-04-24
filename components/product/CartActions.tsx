import { useColorModeValue, Text, Flex, Button } from "@chakra-ui/react";

interface ICartActions {
  handleAddToCart: () => void;
}

const CartActions = ({ handleAddToCart }: ICartActions): JSX.Element => {
  return (
    <Flex gap={10}>
      <Button
        rounded={"md"}
        w={"full"}
        mt={4}
        py={"7"}
        bg={useColorModeValue("blue.900", "blue.50")}
        color={useColorModeValue("white", "gray.900")}
        textTransform={"uppercase"}
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
