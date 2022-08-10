import { Box, Flex, Image, useMediaQuery } from "@chakra-ui/react";
import SearchModal from "../search/SearchModal";
import MobileNavBar from "./Navigation/MobileNavBar";

import NavBar from "./Navigation/NavBar";

export interface INavigationNode {
  name: string;
  id: string;
  children: INavigationNode[];
}

interface IHeader {
  nav: INavigationNode[];
}

const Header = ({ nav }: IHeader): JSX.Element => {
  const [isMobile] = useMediaQuery("(max-width: 48em)");
  const headerPadding = 4;

  return (
    <Box
      p={headerPadding}
      as="header"
      position="sticky"
      top={0}
      bg="white"
      zIndex="sticky"
      borderBottom="1px"
      borderColor="gray.200"
    >
      <Flex alignItems="center" w="100%" justifyContent="space-between">
        {isMobile ? (
          <MobileNavBar nav={nav} />
        ) : (
          <>
            <Box flex={1} minW={4}>
              <Image
                src="/icons/ep-icon.svg"
                alt="EP Icon"
                minWidth="40px"
                width="40px"
                height="40px"
              />
            </Box>

            <Box maxW="80rem" w="100%">
              <NavBar nav={nav} headerPadding={headerPadding} />
            </Box>

            <Box flex={1} display="flex" justifyContent="flex-end">
              <SearchModal />
            </Box>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default Header;
