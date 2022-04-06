import React, { useEffect, useState } from "react";
import { useCartData } from "../../context/state";
import { useFormik } from "formik";
import { addPromotion, removeCartItem } from "../../services/cart";
import {
  FormControl,
  FormLabel,
  Button,
  Box,
  FormErrorMessage,
  Input,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";

interface FormValues {
  promoCode: string;
}

export const Promotion = () => {
  const { updateCartItems, promotionItems } = useCartData();
  const [mcart, setMcart] = useState("");

  const initialValues: FormValues = {
    promoCode: "",
  };

  useEffect(() => {
    const cart = localStorage.getItem("mcart") || "";
    setMcart(cart);
  });

  const { handleSubmit, handleChange, values, errors, setErrors } = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
      addPromotion(mcart, values.promoCode)
        .then(() => {
          updateCartItems();
          setErrors({ promoCode: "" });
          values.promoCode = "";
        })
        .catch((error) => {
          console.error(error);
          setErrors(error.errors[0].detail);
        });
    },
  });

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box display="flex">
          <FormControl isInvalid={errors.length > 0 ? true : false}>
            <FormLabel htmlFor="name">Gift card or discount code</FormLabel>
            <Flex gap="16px">
              <Input
                id="promoCode"
                onChange={handleChange}
                value={values.promoCode}
                disabled={promotionItems && promotionItems.length > 0}
              />
              <Button
                width="120px"
                bg={useColorModeValue("blue.900", "blue.50")}
                type="submit"
                disabled={!values.promoCode}
                color={useColorModeValue("white", "gray.900")}
                _hover={{
                  backgroundColor: "blue.700",
                  boxShadow: "m",
                }}
              >
                Apply
              </Button>
            </Flex>

            <FormErrorMessage>{errors}</FormErrorMessage>
          </FormControl>
        </Box>
      </form>
    </Box>
  );
};
