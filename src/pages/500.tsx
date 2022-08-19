import { Flex, Heading, Link } from "@chakra-ui/react";

import NextLink from "next/link";
import { menuItemStyleProps } from "../lib/menu-style";
import { withNavStaticProps } from "../lib/nav-wrapper-ssg";

export default function Custom500() {
  return (
    <Flex
      direction={"column"}
      h="xl"
      alignItems="center"
      justifyContent="center"
      gap={4}
    >
      <Heading>500 - Internal server error.</Heading>
      <NextLink href="/" passHref>
        <Link {...menuItemStyleProps}>Back to home</Link>
      </NextLink>
    </Flex>
  );
}

export const getStaticProps = withNavStaticProps();
