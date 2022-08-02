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
}

const NavBar = ({ nav }: INavBar): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box as="nav">
      <Menu isOpen={isOpen}>
        {nav.map((item: INavigationNode) => (
          <NavItem key={item.id} item={item} />
        ))}
      </Menu>
    </Box>
  );
};

export default NavBar;
