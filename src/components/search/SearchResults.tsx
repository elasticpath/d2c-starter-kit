import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Divider,
  Grid,
  GridItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Box,
  Flex,
  Spacer,
  Text,
  Heading,
  OrderedList,
  ListItem,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import {
  SearchBox,
  useSortBy,
  useInstantSearch,
} from "react-instantsearch-hooks-web";
import { algoliaEnvData } from "../../lib/resolve-algolia-env";
import CustomHierarchicalMenu from "./CustomHierarchicalMenu";
import Hits from "./Hits";
import Pagination from "./Pagination";

const menuItemInteractionStyle = {
  bg: "none",
  color: "brand.primary.blue",
};

const menuItemStyleProps = {
  _hover: menuItemInteractionStyle,
  _active: menuItemInteractionStyle,
  _focus: menuItemInteractionStyle,
  color: "gray.500",
};

export default function SearchResults(): JSX.Element {
  // const { items, refine: catRefine } = useRefinementList();
  const { uiState } = useInstantSearch();
  const { options, refine } = useSortBy({
    items: [
      { label: "Featured", value: algoliaEnvData.indexName },
      {
        label: "Price (Low to High)",
        value: `${algoliaEnvData.indexName}_price_asc`,
      },
      {
        label: "Price (High to Low)",
        value: `${algoliaEnvData.indexName}_price_desc`,
      },
    ],
  });

  const { hierarchicalMenu, query } = uiState[algoliaEnvData.indexName];
  const slugArray = hierarchicalMenu?.["ep_slug_categories.lvl0"];
  const title = slugArray && slugArray[slugArray?.length - 1];

  interface Breadcrumbs {
    value: string;
    breadcrumb: string;
  }

  function createBreadcrumb(
    [head, ...tail]: string[],
    acc: Breadcrumbs[] = [],
    breadcrumb?: string
  ): Breadcrumbs[] {
    const updatedBreadcrumb = `${breadcrumb ? `${breadcrumb}/` : ""}${head}`;
    const entry = { value: head, breadcrumb: updatedBreadcrumb };
    if (tail.length < 1) {
      return [...acc, entry];
    }
    return createBreadcrumb(tail, [...acc, entry], updatedBreadcrumb);
  }

  const breadcrumbs =
    hierarchicalMenu &&
    createBreadcrumb(hierarchicalMenu?.["ep_slug_categories.lvl0"]);

  return (
    <Grid gap={2} maxW="7xl" mx="auto">
      {/* Breadcrumb */}
      <OrderedList
        display={"flex"}
        fontSize="sm"
        gap={4}
        listStyleType={"none"}
        m={"0"}
      >
        {breadcrumbs?.map((crumb, index, array) => (
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
      <Flex minWidth="max-content" alignItems="center" gap="2" pt={8}>
        <Box py="2">
          <Heading>{title ? title : "Search"}</Heading>
          {query && <Text>Search results for &quot;{query}&quot;</Text>}
        </Box>
        <Spacer />
        <Box py="2">
          <Menu>
            <MenuButton
              as={Button}
              variant="ghost"
              rightIcon={<ChevronDownIcon />}
            >
              Sort
            </MenuButton>
            <MenuList>
              {options.map((option) => (
                <MenuItem
                  key={option.value}
                  onClick={() => refine(option.value)}
                >
                  {option.label}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Box>
      </Flex>
      <Divider />
      <SearchBox />
      <Grid templateColumns="repeat(5, 1fr)" gap={4}>
        <GridItem colSpan={1}>
          <CustomHierarchicalMenu
            attributes={[
              "ep_slug_categories.lvl0",
              "ep_slug_categories.lvl1",
              "ep_slug_categories.lvl2",
              "ep_slug_categories.lvl3",
            ]}
          />
        </GridItem>

        <GridItem colSpan={4}>
          <Hits />
        </GridItem>
      </Grid>

      <Pagination />
    </Grid>
  );
}
