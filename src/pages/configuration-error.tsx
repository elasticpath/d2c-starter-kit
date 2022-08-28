import {
  Flex,
  Heading,
  Link,
  ListItem,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  UnorderedList,
} from "@chakra-ui/react";

import NextLink from "next/link";
import { menuItemStyleProps } from "../lib/menu-style";
import { withStoreServerSideProps } from "../lib/store-wrapper-ssr";
import { NextPage } from "next";
import { globalBaseWidth } from "../styles/theme";

interface IConfigurationError {
  from?: string;
  missingEnvVariables?: string | string[];
}

export const ConfigurationError: NextPage = ({
  missingEnvVariables,
  from,
}: IConfigurationError) => {
  return (
    <Flex
      direction="column"
      h="xl"
      alignItems="center"
      justifyContent="center"
      gap={4}
      p={8}
      maxW={globalBaseWidth}
      m="0 auto"
      w="full"
    >
      <Heading fontSize={{ base: "xl", md: "3xl" }} textAlign="center">
        There is a problem with the stores setup
      </Heading>
      <NextLink href={from ? from : "/"} passHref>
        <Link {...menuItemStyleProps} fontSize={{ base: "md", md: "lg" }}>
          Refresh
        </Link>
      </NextLink>
      <Table variant="simple" size={{ base: "sm", md: "md" }}>
        <Thead>
          <Tr>
            <Th>Issue</Th>
            <Th>Details</Th>
          </Tr>
        </Thead>
        <Tbody>
          {missingEnvVariables && (
            <Tr>
              <Td>Missing Environment Variables</Td>
              <Td>
                <UnorderedList>
                  {(Array.isArray(missingEnvVariables)
                    ? missingEnvVariables
                    : [missingEnvVariables]
                  ).map((missingVar) => (
                    <ListItem key={missingVar} wordBreak="break-all">
                      {missingVar}
                    </ListItem>
                  ))}
                </UnorderedList>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Flex>
  );
};

export default ConfigurationError;

export const getServerSideProps = withStoreServerSideProps<IConfigurationError>(
  async ({ query }) => {
    return {
      props: {
        missingEnvVariables: query["missing-env-variable"],
        from: query.from,
      } as IConfigurationError,
    };
  }
);
