import { useRefinementList } from "react-instantsearch-hooks-web";
import { Box, Button, Flex } from "@chakra-ui/react";

interface ColorRefinement {
  attribute: string;
}

const ColorRefinement = ({ attribute }: ColorRefinement) => {
  const { items, refine } = useRefinementList({ attribute });

  return (
    <Flex gap={2} wrap="wrap" alignItems="center">
      {items.map((o) => (
        <Box
          key={o.value}
          p="0.5"
          {...(o.isRefined
            ? {
                border: "2px solid",
                borderColor: "brand.primary",
              }
            : {})}
          rounded="full"
        >
          <Button
            border="1px solid"
            borderColor="gray.200"
            _hover={{}}
            _active={{}}
            bgColor={o.value}
            p="4"
            rounded="full"
            onClick={() => refine(o.value)}
          />
        </Box>
      ))}
    </Flex>
  );
};

export default ColorRefinement;
