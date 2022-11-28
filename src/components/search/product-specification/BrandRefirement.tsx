import { Heading } from "@chakra-ui/react";
import { RefinementList } from "react-instantsearch-hooks-web";
import s from "./ProductSpecification.module.css";

const BrandRefinement = ({ attribute }: { attribute: string }) => {
  return (
    <>
      <Heading as="h3" size="sm" mt={5} pb={1}>
        Brand
      </Heading>
      <RefinementList
        attribute={attribute}
        classNames={{
          list: s.list,
          labelText: s.labelText,
          checkbox: s.checkbox,
          label: s.label,
          count: s.count,
        }}
      />
    </>
  );
};

export default BrandRefinement;
