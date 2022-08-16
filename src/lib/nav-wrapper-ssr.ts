import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { ParsedUrlQuery } from "querystring";
import {
  buildSiteNavigation,
  NavigationNode,
} from "../components/header/navigation/build-site-navigation";

type IncomingPageServerSideProp<
  P,
  Q extends ParsedUrlQuery = ParsedUrlQuery
> = (
  ctx: GetServerSidePropsContext<Q>,
  nav: NavigationNode[]
) => Promise<GetServerSidePropsResult<P>>;

export function withNavServerSideProps<
  T extends object = {},
  P extends ParsedUrlQuery = ParsedUrlQuery
>(incomingGSSP?: IncomingPageServerSideProp<T, P>) {
  return async (
    ctx: GetServerSidePropsContext<P>
  ): Promise<GetServerSidePropsResult<T & { nav: NavigationNode[] }>> => {
    // Fetching nodes and hierarchies for statically generated nav
    const nav = await buildSiteNavigation();

    const incomingGSSPResult = incomingGSSP
      ? await incomingGSSP(ctx, nav)
      : { props: {} as T };

    if ("props" in incomingGSSPResult) {
      return {
        props: {
          ...(await Promise.resolve(incomingGSSPResult.props)),
          nav,
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
