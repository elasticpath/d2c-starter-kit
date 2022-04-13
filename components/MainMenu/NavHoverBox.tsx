import React, { useEffect, useState } from "react";
import { getNodes } from "../../services/hierarchy";
import { Box, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";

export default function NavHoverBox({ id }) {
  const [subMenu, setSubMenu] = useState([]);

  useEffect(() => {
    async function fetchNodes() {
      const hierarchy = await getNodes(id);
      setSubMenu(hierarchy);
    }
    try {
      fetchNodes();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <>
      {subMenu.map((node) => {
        return (
          <Box
            p="5px"
            _hover={{
              textDecoration: "none",
              fontWeight: "500",
              color: useColorModeValue("gray.500", "gray.800"),
            }}
          >
            <Link href={`/category/${node.id}`}>{node.attributes.name}</Link>
          </Box>
        );
      })}
    </>
  );
}
