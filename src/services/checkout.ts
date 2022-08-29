import type {
  Order,
  ConfirmPaymentBody,
  Address,
  CheckoutCustomerObject,
  Moltin as EPCCClient,
} from "@moltin/sdk";
import { getEpccImplicitClient } from "../lib/epcc-implicit-client";

export function checkout(
  id: string,
  customer: CheckoutCustomerObject,
  billing: Partial<Address>,
  shipping: Partial<Address>,
  client?: EPCCClient
): Promise<{ data: Order }> {
  return (client ?? getEpccImplicitClient())
    .Cart(id)
    .Checkout(customer, billing, shipping);
}

export function payment(
  payment: ConfirmPaymentBody,
  orderId: string,
  client?: EPCCClient
) {
  (client ?? getEpccImplicitClient()).Orders.Payment(orderId, payment);
}
