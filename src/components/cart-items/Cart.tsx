import { GroupedCartItems } from "../../context/types/cart-reducer-types";
import { Grid } from "@chakra-ui/react";
import { CartItemList } from "./CartItemList";
import { CartOrderSummary } from "./CartOrderSummary";

export interface ICart {
  id: string;
  items: GroupedCartItems;
  totalPrice: string;
  subtotal: string;
  removeCartItem: (itemId: string) => Promise<void>;
}

export default function Cart({
  id,
  items,
  totalPrice,
  subtotal,
  removeCartItem,
}: ICart): JSX.Element {
  return (
    <Grid templateColumns={{ base: "1fr", lg: "2fr 1.5fr" }} columnGap="50px">
      <CartItemList items={items} handleRemoveItem={removeCartItem} />
      <CartOrderSummary
        cartId={id}
        handleRemoveItem={removeCartItem}
        promotionItems={items.promotion}
        totalPrice={totalPrice}
        subtotal={subtotal}
      />
    </Grid>
  );
}
