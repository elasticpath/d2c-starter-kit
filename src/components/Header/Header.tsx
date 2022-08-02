import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Tag,
  useColorModeValue,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

import { ReactNode } from "react";
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
    <Box color={useColorModeValue("gray.700", "gray.200")} as="header">
      <NavBar nav={nav} />
    </Box>
  );
};

export default Footer;
