import React, { useState, useEffect } from "react";
import { getHierarchies, getNodes } from "../../services/services";
import { Input } from "@chakra-ui/react";
import { Box, Flex, HStack, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import navStyles from "./mainMenu.module.css";

import NavItem from "./NavItem";

export default function MainMenu() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    async function fetchShippingMethods() {
      const hierarchy = await getHierarchies();
      // @ts-ignore
      setMenu(hierarchy);
    }
    try {
      fetchShippingMethods();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className={navStyles.mobileNav}>
      <Box bg={useColorModeValue("gray.100", "gray.900")} p={2}>
        <Flex alignItems={"center"} justifyContent={"space-between"}></Flex>
        <HStack spacing={8} alignItems={"center"}>
          <Box cursor="pointer">
            <Link href="/">
              <Image
                src="/ep-logo.svg"
                alt="Vercel Logo"
                width={120}
                height={32}
              />
            </Link>
          </Box>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            <Link href="/products">All Products</Link>
            {menu.map((hierarchy) => {
              return (
                <NavItem title={hierarchy.attributes.name} id={hierarchy.id} />
              );
            })}
          </HStack>
          <Input placeholder="Search" w="250px" pos="absolute" right="2" />
        </HStack>

        <Flex></Flex>
      </Box>
    </div>
  );
}
