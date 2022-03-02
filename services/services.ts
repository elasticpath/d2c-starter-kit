import * as moltin from '@moltin/sdk';
import {config} from './config';

const MoltinGateway = moltin.gateway;

export async function loadEnabledCurrencies(): Promise<moltin.Currency[]> {
  const moltin = MoltinGateway({ host: config.endpointURL, client_id: config.clientId });
  const response = await moltin.Currencies.All();

  return response.data.filter(c => c.enabled);
}

export async function loadCategoryTree(language: string): Promise<moltin.Category[]> {
  const moltin = MoltinGateway({ host: config.endpointURL, client_id: config.clientId, language });
  const result = await moltin.Categories.Tree();

  return result.data;
}

const productCache: { [id: string]: moltin.Product } = {};

function setProductCache(key: string, language: string, currency: string, product: moltin.Product) {
  productCache[`${key}:${language}:${currency}`] = product;
}

function getProductCache(key: string, language: string, currency: string): moltin.Product | undefined {
  return productCache[`${key}:${language}:${currency}`];
}

export async function loadCategoryProducts(categoryId: string, pageNum: number, language: string, currency: string): Promise<moltin.ResourcePage<moltin.Product>> {
  const moltin = MoltinGateway({ host: config.endpointURL, client_id: config.clientId, language, currency });

  const result = await moltin.Products
    .Offset((pageNum - 1) * config.categoryPageSize)
    .Limit(config.categoryPageSize)
    .Filter({
      eq: {
        category: {
          id: categoryId
        }
      }
    })
    .All();

  for (const product of result.data) {
    setProductCache(product.id, language, currency, product);
  }

  return result;
}

export async function loadProductBySlug(productSlug: string, language: string, currency: string): Promise<moltin.Product> {
  const cachedProduct = getProductCache(productSlug, language, currency);

  if (cachedProduct) {
    return cachedProduct;
  }

  const moltin = MoltinGateway({ host: config.endpointURL, client_id: config.clientId, language, currency });

  const resultSlug = await moltin.Products
    .Limit(1)
    .Filter({
      eq: {
        slug: productSlug
      }
    })
    .All();

  const productId = resultSlug?.data[0]?.id;
  const result = await moltin.Products.Get(productId);
  const product = result.data;
  setProductCache(product.slug, language, currency, product);

  return product;
}

export async function register(name: string, email: string, password: string): Promise<moltin.CustomerBase> {
  const moltin = MoltinGateway({ host: config.endpointURL, client_id: config.clientId });
  const { data } = await moltin.Customers.Create({
    type: 'customer',
    name,
    email,
    password
  });

  return data;
}

export async function getProductById(productId: string): Promise<moltin.PcmProduct> {
  const moltin = MoltinGateway({ host: config.endpointURL, client_id: config.clientId, client_secret: config.clientSecret });
  const result = await moltin.PCM.Get(productId);
  const product = result.data;
  return product
}

export async function getAllPCMProducts(): Promise<moltin.PcmProduct[]> {
    const moltin = MoltinGateway({ host: config.endpointURL, client_id: config.clientId, client_secret: config.clientSecret });
    const result = await moltin.PCM.All();
    const product = result.data;
    return product
}
  
export async function getProductsByIds(ids: string[]): Promise<any> {
  const moltin = MoltinGateway({ host: config.endpointURL, client_id: config.clientId });
  const productsRequests = ids.map(id => moltin.Products.Get(id));
  const products = await Promise.all(productsRequests);
  return products.map(product => product.data)
}

export async function getCartItems(reference: string): Promise<moltin.CartItemsResponse> {
  const moltin = MoltinGateway({ host: config.endpointURL, client_id: config.clientId });
  const CartItems = await moltin.Cart(reference).Items();

  return CartItems;
}

export async function addToCart(reference: string, productId: string): Promise<void> {
  const moltin = MoltinGateway({ host: config.endpointURL, client_id: config.clientId });
  const quantity = 1;
  await moltin.Cart(reference).AddProduct(productId, quantity);
}

export async function bulkAdd(reference: string, data: moltin.CartItemObject[]): Promise<moltin.CartItemsResponse> {
  const moltin = MoltinGateway({ host: config.endpointURL, client_id: config.clientId });
  const result = await moltin.Cart(reference).BulkAdd(data);

  return result;
}

export async function addPromotion(reference: string, promoCode: string): Promise<void> {
  const moltin = MoltinGateway({ host: config.endpointURL, client_id: config.clientId });
  await moltin.Cart(reference).AddPromotion(promoCode);
}

export async function removeCartItem(reference: string, itemId: string): Promise<void> {
  const moltin = MoltinGateway({ host: config.endpointURL, client_id: config.clientId });
  await moltin.Cart(reference).RemoveItem(itemId);
}

export async function removeAllCartItems(reference: string): Promise<void> {
  const moltin = MoltinGateway({ host: config.endpointURL, client_id: config.clientId });
  await moltin.Cart(reference).RemoveAllItems();
}

export async function updateCartItem(reference: string, productId: string, quantity: number): Promise<void> {
  const moltin = MoltinGateway({ host: config.endpointURL, client_id: config.clientId });
  await moltin.Cart(reference).UpdateItem(productId, quantity);
}

export async function checkout(reference: string, customer: any, billing: any, shipping: any): Promise<{ data: moltin.Order }> {
  const moltin = MoltinGateway({ host: config.endpointURL, client_id: config.clientId });
  const checkoutRes = await moltin.Cart(reference).Checkout(customer, billing, shipping);

  return checkoutRes;
}

export async function payment(payment: moltin.ConfirmPaymentBody, orderId: string) {
  const moltin = MoltinGateway({ host: config.endpointURL, client_id: config.clientId });
  await moltin.Orders.Payment(orderId, payment)
}