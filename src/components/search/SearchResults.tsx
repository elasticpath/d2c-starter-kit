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
} from "@chakra-ui/react";
import {
  SearchBox,
  useSortBy,
  HierarchicalMenu,
  useInstantSearch,
} from "react-instantsearch-hooks-web";
import { algoliaEnvData } from "../../lib/resolve-algolia-env";
import Hits from "./Hits";
import Pagination from "./Pagination";

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
  const title = hierarchicalMenu?.["slug_categories_data.lvl0"].join(" > ");

  return (
    <Grid gap={2} maxW="7xl" mx="auto">
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <Box p="2">
          <Heading>{title ? title : "Search"}</Heading>
          {query && <Text>Search results for &quot;{query}&quot;</Text>}
        </Box>
        <Spacer />
        <Box p="2">
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
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
          <HierarchicalMenu
            attributes={[
              "slug_categories_data.lvl0",
              "slug_categories_data.lvl1",
              "slug_categories_data.lvl2",
              "slug_categories_data.lvl3",
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
