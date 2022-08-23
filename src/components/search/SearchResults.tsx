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
  useInstantSearch,
} from "react-instantsearch-hooks-web";
import { algoliaEnvData } from "../../lib/resolve-algolia-env";
import CustomHierarchicalMenu from "./CustomHierarchicalMenu";
import Hits from "./Hits";
import Pagination from "./Pagination";

export default function SearchResults(): JSX.Element {
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

  return (
    <Grid gap={2} maxW="7xl" mx="auto">
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
