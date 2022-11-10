import React from "react";
import { Box, Button, HStack } from "@chakra-ui/react";

interface PaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
}

export const Pagination = (props: PaginationProps): JSX.Element => {
  const pagesArr = Array.from({ length: props.totalPages }, (_, i) => i + 1);

  return (
    <Box display={pagesArr.length > 1 ? "block" : "none"}>
      <HStack justify="center">
        {pagesArr.map((page) => (
          <Button
            key={page}
            bg={props.currentPage === page ? "brand.primary" : "gray.100"}
            onClick={() => props.onPageChange(page)}
            disabled={false}
            color={props.currentPage === page ? "white" : "black"}
            _hover={{
              backgroundColor: "brand.hover.blue",
              boxShadow: "m",
              color: "white",
            }}
            variant="solid"
          >
            {page}
          </Button>
        ))}
      </HStack>
    </Box>
  );
};

export default Pagination;
