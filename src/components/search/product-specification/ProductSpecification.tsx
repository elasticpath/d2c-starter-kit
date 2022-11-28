import { RefinementList } from "react-instantsearch-hooks-web";
import s from "./ProductSpecification.module.css";
import { Heading } from "@chakra-ui/react";

interface ProductSpecificationProps {
  attribute: string;
}

const ProductSpecification = ({ attribute }: ProductSpecificationProps) => {
  return (
    <>
      <Heading as="h3" size="sm" mt={5} pb={1}>
        Brand
      </Heading>
      <RefinementList
        attribute={attribute}
        classNames={{
          root: s.root,
          list: s.list,
          item: s.item,
          labelText: s.labelText,
          checkbox: s.checkbox,
          label: s.label,
          count: s.count,
        }}
      />
    </>
  );
};

export default ProductSpecification;
