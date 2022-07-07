import React, { useEffect } from "react";
import {
  Box,
  Center,
  Divider,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Input,
  LinkBox,
  LinkOverlay,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Link from "next/link";
import {
  useConnector,
  useHits,
  useHitsPerPage,
  useSearchBox,
} from "react-instantsearch-hooks-web";
import { MinusIcon, ViewOffIcon } from "@chakra-ui/icons";
import { HitsPerPageConnectorParams } from "instantsearch.js/es/connectors/hits-per-page/connectHitsPerPage";
import { useRouter } from "next/router";
import type {
  RangeConnectorParams,
  RangeWidgetDescription,
} from "instantsearch.js/es/connectors/range/connectRange";
import connectRange from "instantsearch.js/es/connectors/range/connectRange";
import { SearchHit } from "../components/search/SearchHit";
import NoResults from "../components/search/NoResults";
import Pagination from "../components/search/Pagination";

type UseRangeSliderProps = RangeConnectorParams;

export const Search: NextPage<{}> = () => {
  const router = useRouter();
  const { refine } = useSearchBox();
  const { search } = router.query;

  useEffect(() => {
    if (typeof search === "string") {
      refine(search);
    }
  }, [search, refine]);

  const HitComponent = ({ hit }: { hit: SearchHit }) => {
    const { ep_price, ep_image_url, ep_name, ep_sku, ep_slug, objectID } = hit;
    return (
      <LinkBox mb="12">
        <Box position="relative" overflow="hidden" pb="100%">
          {ep_image_url ? (
            <Image
              boxSize="100%"
              position="absolute"
              objectFit="cover"
              src={ep_image_url}
              alt={ep_name}
            />
          ) : (
            <Center
              w="100%"
              h="100%"
              bg="gray.200"
              color="white"
              position="absolute"
            >
              <ViewOffIcon w="10" h="10" />
            </Center>
          )}
        </Box>
        <Heading size="sm" mt="4">
          <Link href={`/products/${ep_slug}/${objectID}`} passHref>
            <LinkOverlay>{ep_name}</LinkOverlay>
          </Link>
        </Heading>
        <Text
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
          mt="1"
        >
          {ep_sku}
        </Text>
        <Text fontSize="sm" fontWeight="semibold" mt="1">
          {ep_price}
        </Text>
      </LinkBox>
    );
  };

  const Hits = () => {
    const { hits } = useHits<SearchHit>();
    if (hits.length) {
      return (
        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          {hits.map((hit) => (
            <GridItem key={hit.objectID}>
              <HitComponent hit={hit} />
            </GridItem>
          ))}
        </Grid>
      );
    }
    return <NoResults displayIcon={false} />;
  };

  const HitsPerPage = (props: HitsPerPageConnectorParams) => {
    const { items, refine, hasNoResults } = useHitsPerPage(props);
    const { value } = items.find(({ isRefined }) => isRefined) || {};
    return (
      <Select
        onChange={(event) => refine(Number(event.target.value))}
        defaultValue={value}
        disabled={hasNoResults}
      >
        {items.map(({ value, label }) => (
          <option value={value} key={value}>
            {label}
          </option>
        ))}
      </Select>
    );
  };

  const useRangeSlider = (props?: UseRangeSliderProps) => {
    return useConnector<RangeConnectorParams, RangeWidgetDescription>(
      connectRange,
      props
    );
  };

  const PriceRangeSlider = (props: UseRangeSliderProps) => {
    const { start, range, refine, canRefine } = useRangeSlider(props);

    const [min, max] = start;

    return (
      <Stack spacing={4} my={4}>
        <Heading as="h4" size="md">
          Price
        </Heading>
        <HStack justify="space-evenly">
          <Input
            type="number"
            placeholder="Min"
            w="80px"
            value={min && isFinite(min) ? min : ""}
            readOnly
          />
          <MinusIcon />
          <Input
            type="number"
            placeholder="Max"
            w="80px"
            value={max && isFinite(max) ? max : ""}
            readOnly
          />
        </HStack>
        <RangeSlider
          isDisabled={!canRefine}
          aria-label={["min", "max"]}
          min={Number(range.min)}
          max={Number(range.max)}
          defaultValue={[Number(range.min), Number(range.max)]}
          onChangeEnd={(val) => {
            const [minVal, maxVal] = val;
            if (minVal && maxVal) {
              refine([minVal, maxVal]);
            }
          }}
        >
          <RangeSliderTrack>
            <RangeSliderFilledTrack />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} />
          <RangeSliderThumb index={1} />
        </RangeSlider>
      </Stack>
    );
  };

  return (
    <Box px={24} py={8}>
      <Text>Search results for</Text>
      <Heading>&quot;{search}&quot;</Heading>
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
    </Box>
  );
};
export default Search;
