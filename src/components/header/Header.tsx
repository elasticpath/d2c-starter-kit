import { Box, Flex, Image } from "@chakra-ui/react";
import { NavigationNode } from "../../lib/build-site-navigation";
import SearchModal from "../search/SearchModal";
import MobileNavBar from "./navigation/MobileNavBar";

import NavBar from "./navigation/NavBar";
import Link from "next/link";
import CartMenu from "./cart/CartMenu";
interface IHeader {
  nav: NavigationNode[];
}

const Header = ({ nav }: IHeader): JSX.Element => {
  const headerPadding = 1;

  return (
    <Box pos="sticky" top={0} bg="white" zIndex="sticky">
      <Box
        p={headerPadding}
        as="header"
        borderBottom="1px"
        borderColor="gray.200"
      >
        <Flex
          alignItems="center"
          w="100%"
          justifyContent="space-between"
          display={{ base: "flex", sm: "flex", md: "none" }}
        >
          <MobileNavBar nav={nav} />
        </Flex>
        <Flex
          alignItems="center"
          w="100%"
          justifyContent="space-between"
          display={{ base: "none", sm: "none", md: "flex" }}
        >
          <Box flex={1} minW={16} maxH="65px">
            <Link href="/">
              <a aria-label="Go to home page">
                <Box position="relative" minW={10} w={20} h={20}>
                  <Image src="./icons/ep-logo-swag.png" alt="Ep Logo" />
                </Box>
              </a>
            </Link>
          </Box>
          <Flex gap={4} flex={1} display="flex" justifyContent="flex-end">
            <SearchModal />
            <CartMenu />
          </Flex>
        </Flex>
      </Box>

      <Box
        p={2}
        w="100%"
        borderBottom="1px"
        borderColor="gray.200"
        paddingLeft={10}
      >
        <NavBar nav={nav} headerPadding={headerPadding} />
      </Box>
    </Box>
  );
};

export default Header;
