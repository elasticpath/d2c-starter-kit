import { Box, Flex, Image } from "@chakra-ui/react";
import { NavigationNode } from "../../lib/build-site-navigation";
import SearchModal from "../search/SearchModal";
import MobileNavBar from "./Navigation/MobileNavBar";

import NavBar from "./Navigation/NavBar";

interface IHeader {
  nav: NavigationNode[];
}

const Header = ({ nav }: IHeader): JSX.Element => {
  const headerPadding = 4;

  return (
    <Box
      p={headerPadding}
      as="header"
      pos="sticky"
      top={0}
      bg="white"
      zIndex="sticky"
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
        <Box flex={1} minW={16}>
          <Image
            src="/icons/ep-icon.svg"
            alt="EP Icon"
            minW={10}
            w={10}
            h={10}
          />
        </Box>

        <Box maxW="80rem" w="100%">
          <NavBar nav={nav} headerPadding={headerPadding} />
        </Box>

        <Box flex={1} display="flex" justifyContent="flex-end">
          <SearchModal />
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
