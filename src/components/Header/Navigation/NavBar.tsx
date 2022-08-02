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
import { INavigationNode } from "../Header";
import NavItem from "./NavItem";

interface INavBar {
  nav: INavigationNode[];
  headerRef: any;
}

const NavBar = ({ nav, headerRef }: INavBar): JSX.Element => {
  return (
    <Flex w="100%" as="nav">
      {nav.map((item: INavigationNode) => (
        <NavItem key={item.id} item={item} headerRef={headerRef} />
      ))}
    </Flex>
  );
};

export default NavBar;
