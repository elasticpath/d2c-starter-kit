import * as moltin from "@moltin/sdk";
import { config } from "./config";

const MoltinGateway = moltin.gateway;

export async function checkout(
  reference: string,
  customer: any,
  billing: any,
  shipping: any
): Promise<{ data: moltin.Order }> {
  const moltin = MoltinGateway({
    host: config.endpointURL,
    client_id: config.clientId,
  });
  const checkoutRes = await moltin
    .Cart(reference)
    .Checkout(customer, billing, shipping);

  return checkoutRes;
}

export async function payment(
  payment: moltin.ConfirmPaymentBody,
  orderId: string
) {
  const moltin = MoltinGateway({
    host: config.endpointURL,
    client_id: config.clientId,
  });
  await moltin.Orders.Payment(orderId, payment);
}
