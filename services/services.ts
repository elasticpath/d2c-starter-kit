import * as moltin from "@moltin/sdk";
import { config } from "./config";

const MoltinGateway = moltin.gateway;

export async function loadEnabledCurrencies(): Promise<moltin.Currency[]> {
  const moltin = MoltinGateway({
    host: config.endpointURL,
    client_id: config.clientId,
  });
  const response = await moltin.Currencies.All();

  return response.data.filter((c) => c.enabled);
}

export async function loadCategoryTree(
  language: string
): Promise<moltin.Category[]> {
  const moltin = MoltinGateway({
    host: config.endpointURL,
    client_id: config.clientId,
    language,
  });
  const result = await moltin.Categories.Tree();

  return result.data;
}

const productCache: { [id: string]: moltin.Product } = {};

function setProductCache(
  key: string,
  language: string,
  currency: string,
  product: moltin.Product
) {
  productCache[`${key}:${language}:${currency}`] = product;
}

function getProductCache(
  key: string,
  language: string,
  currency: string
): moltin.Product | undefined {
  return productCache[`${key}:${language}:${currency}`];
}

export async function loadCategoryProducts(
  categoryId: string,
  pageNum: number,
  language: string,
  currency: string
): Promise<moltin.ResourcePage<moltin.Product>> {
  const moltin = MoltinGateway({
    host: config.endpointURL,
    client_id: config.clientId,
    language,
    currency,
  });

  const result = await moltin.Products.Offset(
    (pageNum - 1) * config.categoryPageSize
  )
    .Limit(config.categoryPageSize)
    .Filter({
      eq: {
        category: {
          id: categoryId,
        },
      },
    })
    .All();

  for (const product of result.data) {
    setProductCache(product.id, language, currency, product);
  }

  return result;
}

export async function loadProductBySlug(
  productSlug: string,
  language: string,
  currency: string
): Promise<moltin.Product> {
  const cachedProduct = getProductCache(productSlug, language, currency);

  if (cachedProduct) {
    return cachedProduct;
  }

  const moltin = MoltinGateway({
    host: config.endpointURL,
    client_id: config.clientId,
    language,
    currency,
  });

  const resultSlug = await moltin.Products.Limit(1)
    .Filter({
      eq: {
        slug: productSlug,
      },
    })
    .All();

  const productId = resultSlug?.data[0]?.id;
  const result = await moltin.Products.Get(productId);
  const product = result.data;
  setProductCache(product.slug, language, currency, product);

  return product;
}

export async function register(
  name: string,
  email: string,
  password: string
): Promise<moltin.CustomerBase> {
  const moltin = MoltinGateway({
    host: config.endpointURL,
    client_id: config.clientId,
  });
  const { data } = await moltin.Customers.Create({
    type: "customer",
    name,
    email,
    password,
  });

  return data;
}

export async function getProductsByIds(ids: string[]): Promise<any> {
  const moltin = MoltinGateway({
    host: config.endpointURL,
    client_id: config.clientId,
  });
  const productsRequests = ids.map((id) => moltin.Products.Get(id));
  const products = await Promise.all(productsRequests);
  return products.map((product) => product.data);
}

