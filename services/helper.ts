import { gateway as EPCCGateway } from "@moltin/sdk";
import { config } from "./config";

export const EPCCParam = {
  host: config.endpointURL,
  client_id: config.clientId,
  client_secret: config.clientSecret,
};

export const EPCCAPI = EPCCGateway(EPCCParam);

export async function register(
  name: string,
  email: string,
  password: string
): Promise<moltin.CustomerBase> {
  const { data } = await EPCCAPI.Customers.Create({
    type: "customer",
    name,
    email,
    password,
  });

  return data;
}
