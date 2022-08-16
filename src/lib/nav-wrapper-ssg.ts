import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import type { ParsedUrlQuery } from "querystring";
import {
  buildSiteNavigation,
  NavigationNode,
} from "../components/header/navigation/build-site-navigation";

type IncomingPageStaticProp<P, Q extends ParsedUrlQuery = ParsedUrlQuery> = (
  ctx: GetStaticPropsContext<Q>,
  nav: NavigationNode[]
) => Promise<GetStaticPropsResult<P>>;

export function withNavStaticProps<
  T extends object = {},
  P extends ParsedUrlQuery = ParsedUrlQuery
>(incomingGSP?: IncomingPageStaticProp<T, P>) {
  return async (
    ctx: GetStaticPropsContext<P>
  ): Promise<GetStaticPropsResult<T & { nav: NavigationNode[] }>> => {
    // Fetching nodes and hierarchies for statically generated nav
    const nav = await buildSiteNavigation();

    const incomingGSPResult = incomingGSP
      ? await incomingGSP(ctx, nav)
      : { props: {} as T };

    if ("props" in incomingGSPResult) {
      return {
        props: {
          ...incomingGSPResult.props,
          nav,
        },
      };
    }

    if ("redirect" in incomingGSPResult) {
      return { redirect: { ...incomingGSPResult.redirect } };
    }

    if ("notFound" in incomingGSPResult) {
      return { notFound: incomingGSPResult.notFound };
    }

    // Fallback
    return {
      notFound: true,
    };
  };
}
