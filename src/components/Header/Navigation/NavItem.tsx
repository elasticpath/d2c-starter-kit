import {
  Box,
  Button,
  ButtonGroup,
  ListItem,
  Menu,
  MenuButton,
  MenuGroup,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  useDisclosure,
} from "@chakra-ui/react";

import { INavigationNode } from "../Header";
import NavItemContent from "./NavItemContent";

import { ChakraProvider } from "@chakra-ui/react";
import { styles } from "../../../styles/theme";

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
    // <ListItem marginRight="2rem">
    //   <Popover offset={[0, 30]} matchWidth={true} placement="bottom-start">
    //     <PopoverTrigger>
    //       <span>{item.name}</span>
    //     </PopoverTrigger>

    //     <PopoverContent padding="2rem" width="100%">
    //       <PopoverArrow />
    //       <PopoverBody>
    //         <NavItemContent item={item} />
    //       </PopoverBody>
    //     </PopoverContent>
    //   </Popover>
    // </ListItem>

    // getComputedStyle(document.documentElement).getPropertyValue('--my-variable-name')
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
        _expanded={{ color: "brand.primary.blue" }}
      >
        {item.name}
      </MenuButton>
      <MenuList
        w="100%"
        maxW="80rem"
        padding={menuListPadding}
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
