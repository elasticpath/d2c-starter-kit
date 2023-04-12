import { Badge, Box, Checkbox, Heading, Flex } from "@chakra-ui/react";
import { useConnector } from "react-instantsearch-hooks-web";
import connectRatingMenu from "instantsearch.js/es/connectors/rating-menu/connectRatingMenu";
import StarRatings from "react-star-ratings";

import type {
  RatingMenuConnectorParams,
  RatingMenuWidgetDescription,
} from "instantsearch.js/es/connectors/rating-menu/connectRatingMenu";

export type UseRatingMenuProps = RatingMenuConnectorParams;

export function useRatingMenu(props?: UseRatingMenuProps) {
  return useConnector<RatingMenuConnectorParams, RatingMenuWidgetDescription>(
    connectRatingMenu,
    props
  );
}

const RatingRefinement = ({ attribute }: { attribute: string }) => {
  const { items, refine } = useRatingMenu({ attribute, max: 6 });

  return (
    <Flex gap={2} flexDirection="column">
      <Heading as="h3" size="sm" mt={5} pb={1}>
        Rating
      </Heading>
      {items.map((item) => (
        <Box key={item.value}>
          <Checkbox
            isChecked={item.isRefined}
            onChange={() => refine(item.value)}
          >
            <StarRatings
              rating={Number(item.label)}
              starDimension="18px"
              starSpacing="0px"
              starRatedColor="orange"
            />
          </Checkbox>
          <Badge
            borderRadius={8}
            backgroundColor="gray.200"
            py={0.5}
            px={1.5}
            ml={1}
            fontWeight="medium"
          >
            {item.count}
          </Badge>
        </Box>
      ))}
    </Flex>
  );
};

export default RatingRefinement;
