import {
  GroupedCartItems,
  RefinedCartItem,
} from "../../context/types/cart-reducer-types";
import { Grid } from "@chakra-ui/react";
import { CartItemList } from "./CartItemList";
import { CartOrderSummary } from "./CartOrderSummary";
import { ReadonlyNonEmptyArray } from "../../lib/types/read-only-non-empty-array";

export interface ICart {
  id: string;
  items: ReadonlyNonEmptyArray<RefinedCartItem>;
  groupedItems: GroupedCartItems;
  totalPrice: string;
  subtotal: string;
  removeCartItem: (itemId: string) => Promise<void>;
}

export default function Cart({
  id,
  items,
  groupedItems,
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
        promotionItems={groupedItems.promotion}
        totalPrice={totalPrice}
        subtotal={subtotal}
      />
    </Grid>
  );
}
