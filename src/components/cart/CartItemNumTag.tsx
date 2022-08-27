import { PresentCartState } from "../../context/types/cart-reducer-types";
import { Tag, TagLabel } from "@chakra-ui/react";

export default function CartItemNumTag({
  state,
}: {
  state: PresentCartState;
}): JSX.Element {
  const { regular, custom } = state.items;

  const numCartItems = [...regular, ...custom].reduce((pre, current) => {
    return pre + current.quantity;
  }, 0);

  return (
    <Tag
      display="flex"
      justifyContent="center"
      borderRadius="full"
      bgColor="brand.primary"
      variant="solid"
      position="absolute"
      size="sm"
      top={0}
      right={0.5}
      padding="0px"
      width="20px"
      height="20px"
    >
      <TagLabel fontSize="10px" fontWeight="500">
        {numCartItems}
      </TagLabel>
    </Tag>
  );
}
