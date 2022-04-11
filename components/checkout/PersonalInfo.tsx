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
} from "@chakra-ui/react";

interface FormValues {
  email: string;
}

export default function PersonalInfo({ formStep, nextFormStep }) {
  const { setFormValues } = useCheckoutForm();
  const handleForm = () => {
    setFormValues({ email: "yasi.logh@hdn.com" });
    nextFormStep();
  };

  const initialValues: FormValues = {
    email: "",
  };

  const { handleSubmit, handleChange, values, errors, setErrors } = useFormik({
    initialValues,
    onSubmit: (values) => {
      setFormValues({ email: values.email });
      nextFormStep();
    },
  });

  return (
    <Box p={4}>
      <form onSubmit={handleSubmit}>
        <Box display="flex">
          <FormControl isRequired>
            <FormLabel htmlFor="email">Email (checkout as a guest)</FormLabel>
            <Flex gap="16px">
              <Input
                width="50%"
                id="email"
                onChange={handleChange}
                value={values.email}
              />
              <Button
                width="120px"
                bg={useColorModeValue("blue.900", "blue.50")}
                type="submit"
                disabled={!values.email}
                color={useColorModeValue("white", "gray.900")}
                _hover={{
                  backgroundColor: "blue.700",
                  boxShadow: "m",
                }}
              >
                Continue
              </Button>
            </Flex>
            <FormErrorMessage>{errors}</FormErrorMessage>
          </FormControl>
        </Box>
      </form>
    </Box>
  );
}
