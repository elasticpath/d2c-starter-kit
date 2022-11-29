import { Badge, Checkbox, Heading } from "@chakra-ui/react";
import { useRefinementList } from "react-instantsearch-hooks-web";

const BrandRefinement = ({ attribute }: { attribute: string }) => {
  const { items, refine } = useRefinementList({ attribute });

  return (
    <>
      <Heading as="h3" size="sm" mt={5} pb={1}>
        Brand
      </Heading>
      {items.map((item) => (
        <>
          <Checkbox
            isChecked={item.isRefined}
            key={item.value}
            onChange={() => refine(item.value)}
          >
            {item.label}
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
        </>
      ))}
    </>
  );
};

export default BrandRefinement;
