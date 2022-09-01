import { useField } from "formik";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
} from "@chakra-ui/react";

interface ITextField extends InputProps {
  label: string;
  isRequired?: boolean;
}

export default function CustomFormControl({
  label,
  isRequired = false,
  ...props
}: ITextField): JSX.Element {
  // TODO type props correctly
  const [field, meta] = useField(props as any);

  return (
    <FormControl
      isRequired={isRequired}
      isInvalid={!!meta.error && meta.touched}
    >
      <FormLabel htmlFor="email" fontSize="sm">
        {label}
      </FormLabel>
      <Input {...field} {...props} />
      {meta.error && meta.touched && (
        <FormErrorMessage>
          <>{meta.error}</>
        </FormErrorMessage>
      )}
    </FormControl>
  );
}
