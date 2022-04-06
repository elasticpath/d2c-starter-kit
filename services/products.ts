import * as moltin from "@moltin/sdk";
import { config } from "./config";

const MoltinGateway = moltin.gateway;

export async function getProductById(
  productId: string
): Promise<moltin.ProductResponse> {
  const moltin = MoltinGateway({
    host: config.endpointURL,
    client_id: config.clientId,
    client_secret: config.clientSecret,
  });
  const result = await moltin.Catalog.Products.With("main_image").Get({
    productId,
  });
  const product = result;
  return product;
}

export async function getAllPCMProducts(): Promise<moltin.PcmProduct[]> {
  const moltin = MoltinGateway({
    host: config.endpointURL,
    client_id: config.clientId,
    client_secret: config.clientSecret,
  });
  const result = await moltin.Catalog.Products.All();
  const product = result.data;
  return product;
}
