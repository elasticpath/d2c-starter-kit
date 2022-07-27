import { Divider, Grid, GridItem } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSearchBox } from "react-instantsearch-hooks-web";
import Hits from "./Hits";
import HitsPerPage from "./HitsPerPage";
import Pagination from "./Pagination";
import PriceRangeSlider from "./PriceRangeSlider";

interface ISearchResults {
  query: string;
}

export default function SearchResults({ query }: ISearchResults): JSX.Element {
  const { refine } = useSearchBox();

  useEffect(() => {
    refine(query);
  }, [query, refine]);

  return (
    <Grid
      mt="8"
      templateRows="50px 1fr 50px"
      templateColumns="repeat(5, 1fr)"
      gap={4}
    >
      <GridItem rowStart={2} rowSpan={3} colSpan={1}>
        <PriceRangeSlider attribute={"ep_amount"} />
        <Divider />
      </GridItem>
      <GridItem colStart={4} colSpan={2}>
        <HitsPerPage
          items={[
            { value: 6, label: "Show 6 results" },
            { value: 9, label: "Show 9 results", default: true },
            { value: 12, label: "Show 12 results" },
          ]}
        />
      </GridItem>
      <GridItem colSpan={4}>
        <Hits />
      </GridItem>
      <GridItem colSpan={4}>
        <Pagination />
      </GridItem>
    </Grid>
  );
}
