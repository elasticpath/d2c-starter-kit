import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Flex,
  Image,
  Menu,
  useDisclosure,
} from "@chakra-ui/react";

import { INavigationNode } from "../Header";

import SearchModal from "../../search/SearchModal";
import NavItemContent from "./NavItemContent";

interface IMobileNavBar {
  nav: INavigationNode[];
}

const MobileNavBar = ({ nav }: IMobileNavBar): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button variant="ghost" color="gray.800" onClick={onOpen}>
        <HamburgerIcon />
      </Button>
      <Image src="/icons/ep-icon.svg" alt="EP Icon" minW={10} w={10} h={10} />
      <SearchModal />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        size="full"
        isFullHeight={false}
      >
        <DrawerContent>
          <DrawerHeader>
            <DrawerCloseButton />
          </DrawerHeader>

          <DrawerBody>
            <Flex w="100%" as="nav">
              <Accordion w="100%" defaultIndex={[0]} allowToggle>
                {nav.map((item: INavigationNode, index: number) => (
                  <AccordionItem border={0} key={index}>
                    <h2>
                      <AccordionButton
                        color="gray.800"
                        _expanded={{ color: "brand.primary.blue" }}
                        fontWeight={"bold"}
                        marginBottom={1}
                      >
                        <Box flex="1" textAlign="left">
                          {item.name}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pl={0} pr={0} pb={14}>
                      <Menu>
                        <NavItemContent item={item} />
                      </Menu>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileNavBar;
