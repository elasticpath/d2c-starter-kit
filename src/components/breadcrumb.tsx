import { Box, Link, ListItem, OrderedList } from "@chakra-ui/react";
import { BreadcrumbEntry } from "../lib/create-breadcrumb";

import NextLink from "next/link";
import { menuItemStyleProps } from "../lib/menu-style";

interface IBreadcrumb {
  entries: BreadcrumbEntry[];
}

export default function Breadcrumb({ entries }: IBreadcrumb): JSX.Element {
  return (
    <OrderedList
      display="flex"
      fontSize="sm"
      gap={4}
      listStyleType="none"
      m="0"
    >
      {entries.length > 1 &&
        entries.map((entry, index, array) => (
          <ListItem key={entry.value}>
            {array.length === index + 1 ? (
              <Box as="span" fontWeight="bold">
                {entry.value}
              </Box>
            ) : (
              <NextLink href={`/search/${entry.breadcrumb}`} passHref>
                <Link {...menuItemStyleProps}>{entry.value}</Link>
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
