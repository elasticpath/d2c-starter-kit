import { Box, Container, Flex, Image } from "@chakra-ui/react";

import NavBar from "./Navigation/NavBar";

export interface INavigationNode {
  name: string;
  id: string;
  children: INavigationNode[];
}

interface IHeader {
  nav: INavigationNode[];
}

const Footer = ({ nav }: IHeader): JSX.Element => {
  return (
    <Box p={"4"} as="header">
      <Flex alignItems="center" w="100%" justifyContent="space-between">
        <Box flex={1}>
          <Image
            src="/icons/ep-icon.svg"
            alt="ep Logo"
            width={"40px"}
            height={"40px"}
          />
        </Box>

        <Box maxW="80rem" w="100%">
          <NavBar nav={nav} />
        </Box>

        <Box flex={1}>cart goes here</Box>
      </Flex>
    </Box>
  );
};

export default Footer;
