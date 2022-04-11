import { useRef } from "react";
import { useFormik } from "formik";
import { useCheckoutForm } from "../../context/state";
import {
  FormControl,
  FormLabel,
  Button,
  Box,
  FormErrorMessage,
  Input,
  Flex,
  useColorModeValue,
  Grid,
} from "@chakra-ui/react";

interface FormValues {
  first_name: string;
  last_name: string;
  line_1: string;
  line_2: string;
  city: string;
  county: string;
  country: string;
  postcode: string;
  phone_number: string;
  instructions: string;
}

export default function ShippingForm({ formStep, nextFormStep }) {
  const { setFormValues } = useCheckoutForm();

  let initialValues: FormValues = {
    first_name: "",
    last_name: "",
    line_1: "",
    line_2: "",
    city: "",
    county: "",
    country: "",
    postcode: "",
    phone_number: "",
    instructions: "",
  };

  const {
    handleSubmit,
    handleChange,
    resetForm,
    values,
    errors,
    isValid,
    setValues,
  } = useFormik({
    initialValues,
    onSubmit: (values) => {
      setFormValues(values);
      nextFormStep();
    },
  });

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Flex gap={4} pb={4}>
          <FormControl isRequired>
            <FormLabel htmlFor="first_name">First Name</FormLabel>
            <Input
              id="first_name"
              type="text"
              onChange={handleChange}
              value={values.first_name}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="last_name">Last Name</FormLabel>
            <Input
              id="last_name"
              type="text"
              onChange={handleChange}
              value={values.last_name}
            />
          </FormControl>
        </Flex>
        <Flex gap={4} pb={4}>
          <FormControl isRequired>
            <FormLabel htmlFor="line_1">Street Address</FormLabel>
            <Input
              id="line_1"
              type="text"
              onChange={handleChange}
              value={values.line_1}
            />
          </FormControl>
        </Flex>
        <Box pb={4}>
          <FormLabel htmlFor="line_2">Extended Address</FormLabel>
          <Input
            id="line_2"
            type="text"
            onChange={handleChange}
            value={values.line_2}
          />
        </Box>
        <Flex gap={4} pb={4}>
          <FormControl isRequired>
            <FormLabel htmlFor="city">City</FormLabel>
            <Input
              id="city"
              type="text"
              onChange={handleChange}
              value={values.city}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="county">County</FormLabel>
            <Input
              id="county"
              type="text"
              onChange={handleChange}
              value={values.county}
            />
          </FormControl>
        </Flex>
        <Flex gap={4} pb={4}>
          <FormControl isRequired>
            <FormLabel htmlFor="postcode">Postal Code</FormLabel>
            <Input
              id="postcode"
              type="text"
              onChange={handleChange}
              value={values.postcode}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="country">Country</FormLabel>
            <Input
              id="country"
              type="text"
              onChange={handleChange}
              value={values.country}
            />
          </FormControl>
          {/* <CountriesSelect value={values.country} onChange={handleChange} /> */}
        </Flex>
        <Box pb={4}>
          <FormLabel htmlFor="phone_number">Phone Number</FormLabel>
          <Input
            id="phone_number"
            type="text"
            onChange={handleChange}
            value={values.phone_number}
          />
        </Box>
        <Box pb={4}>
          <FormLabel htmlFor="instructions">Instruction</FormLabel>
          <Input
            id="instructions"
            type="text"
            onChange={handleChange}
            value={values.instructions}
          />
        </Box>
        <Button type="submit" disabled={!isValid}>
          Continue to payment
        </Button>
      </form>
    </Box>
  );
}
