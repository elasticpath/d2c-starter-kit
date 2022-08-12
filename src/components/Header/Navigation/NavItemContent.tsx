import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Flex,
  Link,
  MenuGroup,
  MenuItem,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { INavigationNode } from "../Header";

interface INavItemContent {
  item: INavigationNode;
}

const menuItemInteractionStyle = {
  bg: "none",
  color: "brand.primary.blue",
};

const menuItemStyleProps = {
  _hover: menuItemInteractionStyle,
  _active: menuItemInteractionStyle,
  _focus: menuItemInteractionStyle,
  color: "gray.500",
  margin: "1",
};

const NavItemContent = ({ item }: INavItemContent): JSX.Element => {
  const buildStack = (item: INavigationNode) => {
    return (
      <MenuGroup key={item.id} title={item.name}>
        {item.children.map((child: INavigationNode) => (
          <MenuItem {...menuItemStyleProps} key={child.id}>
            <Link href={"#"} fontSize="sm">
              {child.name}
            </Link>
          </MenuItem>
        ))}
        <MenuItem {...menuItemStyleProps}>
          <Link href={"#"} fontSize="sm" fontWeight="semibold">
            Browse All
          </Link>
        </MenuItem>
      </MenuGroup>
    );
  };

  return (
    <Flex flexDirection="column">
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 4 }}
        spacing={10}
        borderBottom="1px solid"
        borderColor="gray.100"
        paddingBottom={2}
      >
        {item.children.map((parent: INavigationNode, index: number) => {
          return <div key={index}>{buildStack(parent)}</div>;
        })}
      </SimpleGrid>
      <Link
        m={4}
        marginBottom={0}
        href={"#"}
        fontSize="sm"
        fontWeight="semibold"
      >
        <Text
          display="flex"
          flexDirection="row"
          alignItems="center"
          _hover={{ color: "brand.primary.blue" }}
        >
          Browse All {item.name}
          <ArrowForwardIcon marginLeft={1} />
        </Text>
      </Link>
    </Flex>
  );
};

export default NavItemContent;
