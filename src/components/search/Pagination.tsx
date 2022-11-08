import React, { useState } from "react";
import { Box, Button, HStack } from "@chakra-ui/react";

export const Pagination = (): JSX.Element => {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  return (
    <Box display={true ? "block" : "none"}>
      <HStack justify="center">
        {pages.map((page) => (
          <Button
            key={page}
            bg={currentPage === page ? "brand.primary" : "gray.100"}
            onClick={() => setCurrentPage(page)}
            disabled={false}
            color={currentPage === page ? "white" : "black"}
            _hover={{
              backgroundColor: "brand.hover.blue",
              boxShadow: "m",
              color: "white",
            }}
            variant="solid"
          >
            {page + 1}
          </Button>
        ))}
      </HStack>
    </Box>
  );
};

export default Pagination;
