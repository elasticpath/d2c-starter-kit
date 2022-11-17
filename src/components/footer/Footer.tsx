import { ReactNode } from "react";
import {
  Box,
  Container,
  HStack,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { globalBaseWidth } from "../../styles/theme";
import { InfoIcon, PhoneIcon } from "@chakra-ui/icons";
import GithubIcon from "../../../public/icons/github.svg";
import EpLogo from "../../../public/icons/ep-logo.svg";

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight="500" fontSize="lg" mb={2}>
      {children}
    </Text>
  );
};

const Footer = (): JSX.Element => (
  <Box
    as="footer"
    borderTop="4px"
    borderColor="gray.200"
    bg={useColorModeValue("gray.50", "gray.900")}
    color={useColorModeValue("gray.700", "gray.200")}
    padding={{ sm: "0 1rem", lg: "0 2rem", "2xl": "0 4rem" }}
  >
    <Container
      as={Stack}
      maxW={globalBaseWidth}
      py={10}
      borderBottom="1px"
      borderColor="gray.200"
    >
      <SimpleGrid columns={{ base: 1, sm: 2, md: 5 }} spacing={8}>
        <Stack align="flex-start">
          <EpLogo width={120} height={40} />
          <Text fontSize="sm">© 2022 Elastic Path. All rights reserved</Text>
        </Stack>
        <Stack align="flex-start">
          <ListHeader>Product</ListHeader>
          <Link href="#">Home</Link>
          <Link href="#">Features</Link>
          <Link href="#">Shipping</Link>
          <Link href="#">FAQs</Link>
          <Link href="#">Releases</Link>
        </Stack>
        <Stack align="flex-start">
          <ListHeader>Company</ListHeader>
          <Link href="#">About</Link>
          <Link href="#">Press</Link>
          <Link href="#">Careers</Link>
          <Link href="#">Contact</Link>
          <Link href="#">Partners</Link>
        </Stack>
        <Stack align="flex-start">
          <ListHeader>Support</ListHeader>
          <Link href="#">Help Center</Link>
          <Link href="#">Terms of Service</Link>
          <Link href="#">Legal</Link>
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Status</Link>
        </Stack>
        <HStack align="flex-start" justifyContent="flex-end">
          <Box>
            <Link
              href="https://github.com/elasticpath/d2c-reference-store"
              _hover={{
                color: "brand.primary",
              }}
            >
              <GithubIcon width={25} height={25} />
            </Link>
          </Box>
          <Box>
            <Link
              href="https://www.elasticpath.com"
              ml={4}
              _hover={{
                color: "brand.primary",
              }}
            >
              <InfoIcon width={25} height={25} />
            </Link>
          </Box>
          <Box>
            <Link
              href="https://www.elasticpath.com/company/contact-us#contact-information"
              ml={4}
              _hover={{
                color: "brand.primary",
              }}
            >
              <PhoneIcon width={25} height={25} />
            </Link>
          </Box>
        </HStack>
      </SimpleGrid>
    </Container>
  </Box>
);

export default Footer;
