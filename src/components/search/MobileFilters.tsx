import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

export default function MobileFilters(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box display={{ base: "block", md: "none" }}>
      <Button variant="ghost" rightIcon={<ChevronDownIcon />} onClick={onOpen}>
        Filters
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filters</DrawerHeader>

          <DrawerBody></DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
