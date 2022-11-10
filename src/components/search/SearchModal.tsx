import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import HitsProvider from "./HitsProvider";

const SearchBox = ({
  onChange,
  onSearchEnd,
}: {
  onChange: (value: string) => void;
  onSearchEnd: (query: string) => void;
}) => {
  const [search, setSearch] = useState<string>("");

  return (
    <InputGroup>
      <InputLeftElement h="16" pl="8" pointerEvents="none">
        <SearchIcon color="gray.300" />
      </InputLeftElement>
      <Input
        h="16"
        pl="16"
        outline="0"
        border="0"
        boxShadow="none"
        _focus={{ boxShadow: "none" }}
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
          onChange(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            onSearchEnd(search);
          }
        }}
        placeholder="Search"
      />
      <InputRightElement width="4.5rem" h="16" visibility="visible">
        <IconButton
          aria-label="Search database"
          icon={<CloseIcon />}
          onClick={() => {
            onChange("");
            setSearch("");
          }}
        />
      </InputRightElement>
    </InputGroup>
  );
};

export const SearchModal = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  return (
    <Box>
      <Button
        variant="ghost"
        onClick={onOpen}
        fontWeight="normal"
        justifyContent="left"
      >
        <SearchIcon color="gray.800" />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxH="calc(100% - 7.5rem)">
          <SearchBox
            onChange={(value: string) => {
              setSearchValue(value);
            }}
            onSearchEnd={(query) => {
              onClose();
              setSearchValue("");
              router.push({
                pathname: "/search/",
                query: { query },
              });
            }}
          />
          {searchValue ? (
            <Box overflowX="scroll" px="4" pb="4">
              <Divider />
              <Box mt="4">
                <HitsProvider />
              </Box>
            </Box>
          ) : null}
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SearchModal;
