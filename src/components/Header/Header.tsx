import { Box, Flex, Image } from "@chakra-ui/react";

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
        <Box flex={1}>
          <Image
            src="/icons/ep-icon.svg"
            alt="EP Icon"
            width="40px"
            height="40px"
          />
        </Box>

        <Box maxW="80rem" w="100%">
          <NavBar nav={nav} headerPadding={headerPadding} />
        </Box>

        <Box flex={1}>cart goes here</Box>
      </Flex>
    </Box>
  );
};

export default Header;
