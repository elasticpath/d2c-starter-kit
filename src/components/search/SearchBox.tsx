import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import { useDebouncedEffect } from "../../lib/use-debounced";

interface SearchBoxProps {
  onSearch: (q: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps): JSX.Element {
  const [search, setSearch] = useState<string>("");
  const [cleared, setCleared] = useState<boolean>(false);

  useDebouncedEffect(
    () => {
      if (search) {
        onSearch(search);
      }
      if (cleared) {
        onSearch(search);
        setCleared(false);
      }
    },
    400,
    [search]
  );

  return (
    <InputGroup bgColor="gray.50" rounded="lg">
      <InputLeftElement h="12" pl="4" pointerEvents="none">
        <SearchIcon color="gray.300" />
      </InputLeftElement>
      <Input
        h="12"
        pl="12"
        outline="0"
        border="0"
        boxShadow="none"
        _focus={{ boxShadow: "none" }}
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
        placeholder="Search"
      />
      <InputRightElement width="4.5rem" h="12">
        <IconButton
          aria-label="Search database"
          icon={<CloseIcon />}
          variant="ghost"
          onClick={() => {
            setCleared(true);
            setSearch("");
          }}
        />
      </InputRightElement>
    </InputGroup>
  );
}
