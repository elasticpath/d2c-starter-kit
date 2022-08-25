import { useFormik } from "formik";
import { useCheckoutForm } from "../../context/checkout";
import {
  FormControl,
  FormLabel,
  Box,
  FormErrorMessage,
  Input,
  Flex,
} from "@chakra-ui/react";

interface FormValues {
  email: string;
}

export default function PersonalInfo(): JSX.Element {
  const { setShippingFormValues } = useCheckoutForm();

  const initialValues: FormValues = {
    email: "",
  };

  const { handleChange, values, errors } = useFormik({
    initialValues,
    onSubmit: (values) => {
      setShippingFormValues({ email: values.email });
    },
  });

  return (
    <Box display="flex" p={4}>
      <FormControl isRequired>
        <FormLabel htmlFor="email">Email (checkout as a guest)</FormLabel>
        <Flex gap="16px">
          <Input
            width="50%"
            id="email"
            onChange={handleChange}
            value={values.email}
          />
        </Flex>
        <FormErrorMessage>
          <>{errors}</>
        </FormErrorMessage>
      </FormControl>
    </Box>
  );
}
