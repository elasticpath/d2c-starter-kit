import {
  Box,
  Button,
  ButtonGroup,
  Portal,
  useDisclosure,
} from "@chakra-ui/react";

import { Menu, MenuButton, MenuList } from "@chakra-ui/react";

import { INavigationNode } from "../Header";
import NavItemContent from "./NavItemContent";

interface INavItem {
  item: INavigationNode;
  headerRef: any;
}

const NavItem = ({ item, headerRef }: INavItem): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Menu isOpen={true}>
      <MenuButton
        as={Button}
        variant="link"
        marginRight="2rem"
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
        _expanded={{ color: "brand.primary.blue" }}
      >
        {item.name}
      </MenuButton>
      <Portal containerRef={headerRef}>
        <MenuList
          as={Box}
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
          w="100%"
          maxW="80rem"
          position="relative"
        >
          <NavItemContent item={item} />
        </MenuList>
      </Portal>
    </Menu>
  );
};

export default NavItem;
