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
  others,
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

interface INavItemContent {
  item: INavigationNode;
}

const NavItemContent = ({ item }: INavItemContent): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // console.log("nav", nav);

  const buildStack = (item: INavigationNode) => {
    return (
      <Stack align={"flex-start"}>
        <ListHeader>{item.name}</ListHeader>
        {item.children.map((child: INavigationNode) => {
          return (
            <MenuItem key={child.id}>
              <Link href={"#"}>{child.name}</Link>
            </MenuItem>
          );
        })}
      </Stack>
    );
  };

  return (
    <>
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          {item.children.map((parent: INavigationNode) => {
            return buildStack(parent);
          })}
        </SimpleGrid>
      </Container>
    </>
  );
};

export default NavItemContent;
