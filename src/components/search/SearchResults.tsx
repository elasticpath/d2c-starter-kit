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
import { createBreadcrumb } from "../../lib/create-breadcrumb";
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
        {breadcrumbs &&
          breadcrumbs?.length > 1 &&
          breadcrumbs?.map((crumb, index, array) => (
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
      <Grid templateColumns={{ base: "1fr", md: "auto 1fr" }} gap={8}>
        <GridItem display={{ base: "none", md: "block" }}>
          <CustomHierarchicalMenu
            attributes={[
              "ep_slug_categories.lvl0",
              "ep_slug_categories.lvl1",
              "ep_slug_categories.lvl2",
              "ep_slug_categories.lvl3",
            ]}
          />
        </GridItem>

        <GridItem>
          <Hits />
        </GridItem>
      </Grid>

      <Pagination />
    </Grid>
  );
}
