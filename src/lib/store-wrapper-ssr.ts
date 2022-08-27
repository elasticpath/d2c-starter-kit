import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "querystring";
import { buildSiteNavigation, NavigationNode } from "./build-site-navigation";
import { getCart } from "../services/cart";
import { StoreContextSSR } from "./types/store-context";
import { getCartCookie } from "./cart-cookie";

type IncomingPageServerSideProp<
  P,
  Q extends ParsedUrlQuery = ParsedUrlQuery
> = (
  ctx: GetServerSidePropsContext<Q>,
  nav: NavigationNode[]
) => Promise<GetServerSidePropsResult<P>>;

interface ExpandedContext {
  store: StoreContextSSR;
}

export function withStoreServerSideProps<
  T extends object = {},
  P extends ParsedUrlQuery = ParsedUrlQuery
>(incomingGSSP?: IncomingPageServerSideProp<T, P>) {
  return async (
    ctx: GetServerSidePropsContext<P>
  ): Promise<GetServerSidePropsResult<T & ExpandedContext>> => {
    // Fetching nodes and hierarchies for statically generated nav
    const nav = await buildSiteNavigation();
    const cartCookie = getCartCookie({ req: ctx.req, res: ctx.res });
    console.log("cartCookie: ", cartCookie);

    const cart = await getCart(cartCookie);

    const incomingGSSPResult = incomingGSSP
      ? await incomingGSSP(ctx, nav)
      : { props: {} as T };

    if ("props" in incomingGSSPResult) {
      return {
        props: {
          ...(await Promise.resolve(incomingGSSPResult.props)),
          store: {
            type: "store-context-ssr",
            nav,
            cart,
          },
        },
      };
    }

    if ("redirect" in incomingGSSPResult) {
      return { redirect: { ...incomingGSSPResult.redirect } };
    }

    if ("notFound" in incomingGSSPResult) {
      return { notFound: incomingGSSPResult.notFound };
    }

    // Fallback
    return {
      notFound: true,
    };
  };
}
