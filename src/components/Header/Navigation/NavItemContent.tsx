import { Container, Link, SimpleGrid, Stack } from "@chakra-ui/react";
import { INavigationNode } from "../Header";

interface INavItemContent {
  item: INavigationNode;
}

const NavItemContent = ({ item }: INavItemContent): JSX.Element => {
  const buildStack = (item: INavigationNode) => {
    return (
      <Stack key={item.id} align={"flex-start"}>
        <h2>{item.name}</h2>
        {item.children.map((child: INavigationNode) => {
          return (
            <Link key={child.id} href={"#"}>
              {child.name}
            </Link>
          );
        })}
      </Stack>
    );
  };

  return (
    <Container maxW={"80rem"} width="100%">
      <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
        {item.children.map((parent: INavigationNode) => {
          return buildStack(parent);
        })}
      </SimpleGrid>
    </Container>
  );
};

export default NavItemContent;
