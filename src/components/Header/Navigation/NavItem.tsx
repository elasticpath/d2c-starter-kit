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

import { ReactNode } from "react";
import { INavigationNode } from "../Header";
import NavItemContent from "./NavItemContent";

interface INavItem {
  item: INavigationNode;
}

const NavItem = ({ item }: INavItem): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Menu isOpen={isOpen}>
      <MenuButton as={Button} onMouseEnter={onOpen} onMouseLeave={onClose}>
        {item.name}
      </MenuButton>
      <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
        <NavItemContent item={item} />
      </MenuList>
    </Menu>
  );
};

export default NavItem;
