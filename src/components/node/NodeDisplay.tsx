import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Flex,
  Text,
  Box,
  Menu,
  useColorModeValue,
  MenuButton,
  MenuList,
  useDisclosure,
  chakra,
  Link,
  Heading,
  Stack,
  Grid,
  GridItem,
  GridProps,
  GridItemProps,
  Button,
  Image,
} from "@chakra-ui/react";
import { Node } from "@moltin/sdk";
import { getNodes } from "../../services/hierarchy";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

export type NodeSpec = Node | Node[] | string;

interface INodeDsiplay {
  nodeSpec: NodeSpec;
  title: string;
  //hierarchyId: string;
  // nodesArr?: Node[];
  buttonProps?: {
    link?: string;
    text?: string;
  };
}

const titleFontSizes = {
  base: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.1rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
  "6xl": "4rem",
};

const gridItemStyles: GridItemProps[] = [
  {
    rowSpan: 2,
    /**
     * padding-bottom trick for aspect ratio boxes
     * see - https://css-tricks.com/aspect-ratio-boxes/
     * calc(aspectH / aspectW * 100%)
     */
    pb: { sm: "100%" },
  },
  {
    pb: { sm: "0" },
    rowSpan: "auto",
  },
  {
    pb: { sm: "0" },
    rowSpan: "auto",
  },
];

export default function NodeDisplay({
  nodeSpec,
  title,
  // nodesArr,
  // hierarchyId,
  buttonProps,
}: INodeDsiplay) {
  const router = useRouter();
  const [nodes, setNodes] = useState<Node[]>([]);

  const hierarchyId = useMemo(
    () =>
      typeof nodeSpec === "string"
        ? nodeSpec
        : Array.isArray(nodeSpec)
        ? nodeSpec.length > 0
          ? nodeSpec[0].relationships.parent.data.id
          : undefined
        : nodeSpec.relationships.parent.data.id,
    [nodeSpec]
  );

  const fetchTopNodes = useCallback(async () => {
    const allNodes = Array.isArray(nodeSpec)
      ? [...nodeSpec]
      : typeof nodeSpec === "object"
      ? [nodeSpec]
      : await getNodes(hierarchyId!);
    console.log("allNodes in effect", allNodes);
    const topNodes = allNodes.slice(0, Math.min(2, allNodes.length));
    const nodesToSet =
      topNodes.length > 0
        ? topNodes
        : // : nodesArr != null && nodesArr.length > 0
          // ? nodesArr
          [];
    if (nodesToSet == null || nodesToSet.length === 0) {
      console.log("Not enough nodes to display - setting to empty");
    }

    setNodes([...nodesToSet, ...nodesToSet, ...nodesToSet]);
  }, [nodeSpec, hierarchyId]);

  useEffect(() => {
    try {
      fetchTopNodes();
    } catch (error) {
      console.log(error);
    }
  }, [fetchTopNodes]);

  return (
    <Stack
      // h={"100%"}
      w={{ base: "100%" }}
      bg={"#FFAFB"}
      display={"flex"}
      maxW={"80rem"}
      mx="auto"
      py={{ base: "4rem", md: "6rem" }}
      px={{ base: "1rem", md: "1.5rem" }}
    >
      <Flex
        justifyContent={"space-between"}
        alignItems={"baseline"}
        padding={"1em"}
      >
        <Heading
          as={"h1"}
          fontSize={{ base: "1.1rem", md: "1.2rem", lg: "1.5rem" }}
          fontWeight={"extrabold"}
        >
          {title}
        </Heading>
        {buttonProps && (
          <Link
            color={"#6158E8"}
            fontWeight={"bold"}
            fontSize={{ base: "sm", md: "md" }}
            onClick={() => {
              buttonProps.link && router.push(buttonProps.link);
            }}
            wordBreak={"break-word"}
          >
            {buttonProps.text} <ArrowForwardIcon color={"inherit"} />
          </Link>
        )}
      </Flex>
      <Grid
        gap={{ lg: 8 }}
        columnGap={{ base: "6" }}
        rowGap={{ base: "1.5rem", sm: "6" }}
        templateRows="repeat(2, minmax(0,1fr))"
        templateColumns={{
          base: "repeat(1,minmax(0,1fr)",
          sm: "repeat(2, minmax(0,1fr))",
        }}
        pb={"1em"}
        px={"1em"}
      >
        {nodes &&
          nodes.map((node, i) => {
            return (
              <GridItem
                position={"relative"}
                key={`node-${node.id}`}
                rounded={"2xl"}
                overflow={"hidden"}
                pb={{ base: "50%", ...(gridItemStyles[i].pb as object) }}
                rowSpan={gridItemStyles[i].rowSpan}
                {...(nodes.length === 1 && { gridColumn: "1 / -1" })}
                {...(nodes.length === 2 && {
                  ...gridItemStyles[0],
                })}
              >
                <Box
                  position={"absolute"}
                  w={"100%"}
                  h={"100%"}
                  top="0"
                  left="0"
                  right="0"
                  bottom="0"
                  bgGradient="linear(to-r, gray.300, blue.500)"
                  _hover={{ opacity: "75%" }}
                />
                {/* <Image
                objectPosition={"center"}
                objectFit={"cover"}
                // src={"/images/pillow.jpeg"}
                bgGradient="linear(to-r, green.200, pink.500)"
                alt={"pillow"}
                _hover={{ opacity: "75%" }}
                w={"100%"}
                h={"100%"}
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
              /> */}
                <Flex
                  fontWeight={"bold"}
                  bottom={"10%"}
                  left={"10%"}
                  zIndex={"100"}
                  position="absolute"
                  flexDirection={"column"}
                  justifyContent={"space-between"}
                >
                  <Heading size={"md"}>{node.attributes.name}</Heading>
                  <Text fontWeight={"initial"} fontSize={"md"}>
                    Shop now
                  </Text>
                </Flex>
              </GridItem>
            );
          })}
      </Grid>
    </Stack>
  );
}
