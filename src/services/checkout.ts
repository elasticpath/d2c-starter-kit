import type {
  Order,
  ConfirmPaymentBody,
  Address,
  CheckoutCustomerObject,
} from "@moltin/sdk";
import { EPCCAPI } from "./helper";

export async function checkout(
  id: string,
  customer: CheckoutCustomerObject,
  billing: Partial<Address>,
  shipping: Partial<Address>
): Promise<{ data: Order }> {
  return EPCCAPI.Cart(id).Checkout(customer, billing, shipping);
}

export async function payment(payment: ConfirmPaymentBody, orderId: string) {
  await EPCCAPI.Orders.Payment(orderId, payment);
}

export async function removeAllCartItems(reference: string): Promise<void> {
  await EPCCAPI.Cart(reference).RemoveAllItems();
}
