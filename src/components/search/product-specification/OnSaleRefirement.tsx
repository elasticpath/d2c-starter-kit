import { Heading } from "@chakra-ui/react";
import { ToggleRefinement } from "react-instantsearch-hooks-web";
import s from "./ProductSpecification.module.css";

const OnSaleRefinement = ({ attribute }: { attribute: string }) => {
  return (
    <>
      <Heading as="h3" size="sm" mt={5} pb={1}>
        On sale
      </Heading>
      <ToggleRefinement
        attribute={attribute}
        label="On sale products"
        on={true}
        classNames={{
          labelText: s.labelText,
          checkbox: s.checkbox,
          label: s.label,
        }}
      />
    </>
  );
};

export default OnSaleRefinement;
