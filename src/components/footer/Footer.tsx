import Image from "next/image";
import {
  Box,
  Container,
  HStack,
  Link,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";

import { globalBaseWidth } from "../../styles/theme";
import { InfoIcon } from "@chakra-ui/icons";

const Footer = (): JSX.Element => (
  <Box as="footer" borderTop="1px" borderColor="gray.200" bg="white">
    <Container as={Stack} maxW={globalBaseWidth} py={10}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 5 }} spacing={8}>
        <Stack align="flex-start">
          <Image
            src="/icons/ep-logo.svg"
            alt="Elastic Path logo"
            width={120}
            height={40}
          />
        </Stack>
        <Stack align="flex-start">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/shipping">Shipping</Link>
        </Stack>
        <Stack align="flex-start">
          <Link href="/faq">FAQ</Link>
        </Stack>
        <Stack align="flex-start"></Stack>
        <HStack align="flex-start" justifyContent="flex-end">
          <Box>
            <Link href="https://github.com/elasticpath/d2c-reference-store">
              <Image
                src="/icons/github.svg"
                alt="GitHub Icon"
                width={25}
                height={25}
              />
            </Link>
          </Box>
          <Box>
            <Link
              href="https://github.com/elasticpath/d2c-reference-store"
              ml={4}
            >
              <InfoIcon width={25} height={25} />
            </Link>
          </Box>
        </HStack>
      </SimpleGrid>
    </Container>
  </Box>
);

export default Footer;
