import { Box, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { IExtensions } from "../../lib/product-types";

interface IProductExtensions {
  extensions: IExtensions;
}

const ProductExtensions = ({ extensions }: IProductExtensions): JSX.Element => {
  const extensionsValues = Object.values(extensions ?? {}).flat();
  const colour = useColorModeValue("blue.500", "blue.300");
  if (extensions) {
    return (
      <Stack spacing={{ base: 4, sm: 6 }} direction={"column"}>
        <Box>
          <Text
            fontSize={{ base: "16px", lg: "18px" }}
            color={colour}
            fontWeight={"500"}
            textTransform={"uppercase"}
            mb={"4"}
          >
            More Info
          </Text>
          {extensionsValues.map((extension) => {
            const extensionKeys = Object.keys(extension);
            return extensionKeys.map((key) => {
              let value = extension[key];
              if (typeof value === "boolean") {
                value = value ? "Yes" : "No";
              }
              return (
                <Box key={`${key}-${value}`}>
                  <Text fontWeight={"600"} textTransform={"capitalize"}>
                    {key}
                  </Text>
                  <Text mb={2}>{value}</Text>
                </Box>
              );
            });
          })}
        </Box>
      </Stack>
    );
  }
  return <></>;
};

export default ProductExtensions;
