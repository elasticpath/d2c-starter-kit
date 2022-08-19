import { Box, Link, ListItem, OrderedList } from "@chakra-ui/react";
import { Breadcrumb as BreadcrumbType } from "../lib/create-breadcrumb";

import NextLink from "next/link";
import { menuItemStyleProps } from "../lib/menu-style";

interface IBreadcrumb {
  breadcrumbs: BreadcrumbType[];
}

export default function Breadcrumb({ breadcrumbs }: IBreadcrumb): JSX.Element {
  return (
    <OrderedList
      display={"flex"}
      fontSize="sm"
      gap={4}
      listStyleType={"none"}
      m={"0"}
    >
      {breadcrumbs.length > 1 &&
        breadcrumbs.map((crumb, index, array) => (
          <ListItem key={crumb.value}>
            {array.length === index + 1 ? (
              <Box as="span" fontWeight={"bold"}>
                {crumb.value}
              </Box>
            ) : (
              <NextLink href={`/search/${crumb.breadcrumb}`} passHref>
                <Link {...menuItemStyleProps}>{crumb.value}</Link>
              </NextLink>
            )}
            {array.length !== index + 1 && (
              <Box as="span" ml={4}>
                /
              </Box>
            )}
          </ListItem>
        ))}
    </OrderedList>
  );
}
