import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Flex,
  Link,
  MenuGroup,
  MenuItem,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { NavigationNode } from "../../../lib/build-site-navigation";
import NextLink from "next/link";

interface INavItemContent {
  item: NavigationNode;
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
  const buildStack = (item: NavigationNode) => {
    return (
      <MenuGroup key={item.id} title={item.name}>
        {item.children.map((child: NavigationNode) => (
          <MenuItem {...menuItemStyleProps} key={child.id}>
            <NextLink href={`/search${child.href}`} passHref>
              <Link fontSize="sm">{child.name}</Link>
            </NextLink>
          </MenuItem>
        ))}
        <MenuItem {...menuItemStyleProps}>
          <NextLink href={`/search${item.href}`} passHref>
            <Link fontSize="sm" fontWeight="semibold">
              Browse All
            </Link>
          </NextLink>
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
        {item.children.map((parent: NavigationNode, index: number) => {
          return <div key={index}>{buildStack(parent)}</div>;
        })}
      </SimpleGrid>
      <NextLink href={`/search${item.href}`} passHref>
        <Link m={4} marginBottom={0} fontSize="sm" fontWeight="semibold">
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
      </NextLink>
    </Flex>
  );
};

export default NavItemContent;
