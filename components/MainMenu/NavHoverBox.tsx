import React, { useEffect, useState } from "react";
import { getNodes } from "../../services/services";
import { Box, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";

// @ts-ignore
export default function NavHoverBox({ id }) {
  const [subMenu, setSubMenu] = useState([]);

  useEffect(() => {
    async function fetchShippingMethods() {
      const hierarchy = await getNodes(id);
      // @ts-ignore
      setSubMenu(hierarchy);
    }
    try {
      fetchShippingMethods();
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
            <Link href={`/category/${id}/${node.id}`}>
              {node.attributes.name}
            </Link>
          </Box>
        );
      })}
    </>
  );
}
