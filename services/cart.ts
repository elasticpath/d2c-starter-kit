import * as moltin from "@moltin/sdk";
import { config } from "./config";

const MoltinGateway = moltin.gateway;


export async function getCartItems(
    reference: string
  ): Promise<moltin.CartItemsResponse> {
    const moltin = MoltinGateway({
      host: config.endpointURL,
      client_id: config.clientId,
    });
    const CartItems = await moltin.Cart(reference).Items();
  
    return CartItems;
  }
  
  export async function addToCart(
    reference: string,
    productId: string
  ): Promise<void> {
    const moltin = MoltinGateway({
      host: config.endpointURL,
      client_id: config.clientId,
    });
    const quantity = 1;
    await moltin.Cart(reference).AddProduct(productId, quantity);
  }


export async function removeCartItem(
    reference: string,
    itemId: string
  ): Promise<void> {
    const moltin = MoltinGateway({
      host: config.endpointURL,
      client_id: config.clientId,
    });
    await moltin.Cart(reference).RemoveItem(itemId);
  }
  
  export async function removeAllCartItems(reference: string): Promise<void> {
    const moltin = MoltinGateway({
      host: config.endpointURL,
      client_id: config.clientId,
    });
    await moltin.Cart(reference).RemoveAllItems();
  }
  
  export async function updateCartItem(
    reference: string,
    productId: string,
    quantity: number
  ): Promise<void> {
    const moltin = MoltinGateway({
      host: config.endpointURL,
      client_id: config.clientId,
    });
    await moltin.Cart(reference).UpdateItem(productId, quantity);
  }

  export async function addPromotion(
    reference: string,
    promoCode: string
  ): Promise<void> {
    const moltin = MoltinGateway({
      host: config.endpointURL,
      client_id: config.clientId,
    });
    await moltin.Cart(reference).AddPromotion(promoCode);
  }
  