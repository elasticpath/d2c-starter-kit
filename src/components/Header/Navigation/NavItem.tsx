import { Button, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { INavigationNode } from "../Header";
import { ChakraProvider } from "@chakra-ui/react";
import { styles } from "../../../styles/theme";

import NavItemContent from "./NavItemContent";

interface INavItem {
  item: INavigationNode;
  headerPadding: number;
}

const calculateOffset = (value: number, vertical: boolean = false) => {
  const rem = ChakraProvider.defaultProps?.theme?.space[value];
  const global = styles.global.html.fontSize;

  // Adjusting the offset to align correctly
  const result: number = parseFloat(rem) * parseFloat(global);
  return vertical ? result + 10 : result * 2;
};

const NavItem = ({ item, headerPadding }: INavItem): JSX.Element => {
  const menuListPadding = 4;

  return (
    <Menu
      offset={[
        -calculateOffset(menuListPadding),
        calculateOffset(headerPadding, true),
      ]}
    >
      <MenuButton
        as={Button}
        variant="link"
        marginRight="2rem"
        color="gray.800"
        _expanded={{ color: "brand.primary.blue" }}
      >
        {item.name}
      </MenuButton>
      <MenuList
        w="100%"
        maxW="80rem"
        p={menuListPadding}
        borderTopLeftRadius={0}
        borderTopRightRadius={0}
        sx={{
          // Workaround for https://github.com/chakra-ui/chakra-ui/issues/4276
          boxShadow: `${ChakraProvider.defaultProps?.theme?.shadows["xl"]} !important`,
        }}
      >
        <NavItemContent item={item} />
      </MenuList>
    </Menu>
  );
};

export default NavItem;
