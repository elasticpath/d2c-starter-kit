import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Flex,
  Text,
  Box,
  Link,
  Heading,
  Stack,
  Grid,
  GridItem,
  GridItemProps,
  Skeleton,
  SkeletonProps,
} from "@chakra-ui/react";
import { Node } from "@moltin/sdk";
import {
  getHierarchyChildren,
  getNodeChildren,
} from "../../services/hierarchy";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

interface NodeSpecNode {
  type: "node";
  data: Node | Node[] | string;
}

interface NodeSpecHierarchy {
  type: "hierarchy";
  data: Node | Node[] | string;
}

export type NodeSpec = NodeSpecHierarchy | NodeSpecNode; // could be Hierarchy | Node

interface INodeDsiplay {
  nodeSpec: NodeSpec;
  title: string;
  buttonProps?: {
    link: string;
    text: string;
  };
}

const gridItemStyles: GridItemProps[] = [
  {
    rowSpan: 2,
    /**
     * padding-bottom trick for aspect ratio boxes
     * see - https://css-tricks.com/aspect-ratio-boxes/
     * calc(aspectH / aspectW * 100%)
     */
    pb: { base: "50%", md: "100%" },
  },
  {
    pb: { base: "50%", md: "0" },
    rowSpan: "auto",
  },
  {
    pb: { base: "50%", md: "0" },
    rowSpan: "auto",
  },
];

const skeletonItemStyles: SkeletonProps[] = [
  {
    startColor: "blue.500",
    endColor: "blue.400",
    rounded: "25px",
    height: { base: "175px", md: "435px" },
  },
  {
    startColor: "blue.500",
    endColor: "blue.400",
    rounded: "25px",
    height: { base: "175px", md: "200" },
  },
  {
    startColor: "blue.500",
    endColor: "blue.400",
    rounded: "25px",
    height: { base: "175px", md: "200" },
  },
];

export default function NodeDisplay({
  nodeSpec,
  title,
  buttonProps,
}: INodeDsiplay) {
  const router = useRouter();
  const [nodes, setNodes] = useState<Node[]>([]);

  /**
   * Either a hierarchy or a node ID
   */
  const idSpec = useMemo<string | undefined>(
    () => (typeof nodeSpec.data === "string" ? nodeSpec.data : undefined),
    [nodeSpec]
  );

  const getChildren = useCallback(() => {
    return nodeSpec.type === "node" ? getNodeChildren : getHierarchyChildren;
  }, [nodeSpec]);

  const fetchTopNodes = useCallback(async () => {
    const nodesArrayResponse = Array.isArray(nodeSpec.data)
      ? [...nodeSpec.data]
      : typeof nodeSpec.data === "object"
      ? [nodeSpec.data]
      : idSpec != undefined
      ? await getChildren()(idSpec)
      : [];

    console.log("allNodes in effect", nodesArrayResponse);

    /// ----- nodes array ready ----
    const topNodes: Node[] = nodesArrayResponse.slice(
      0,
      Math.min(3, nodesArrayResponse.length)
    );

    if (topNodes == null || topNodes.length === 0) {
      console.log("Not enough nodes to display - setting to empty");
    }

    setNodes([topNodes[0]]);
  }, [nodeSpec, idSpec, getChildren]);

  useEffect(() => {
    try {
      fetchTopNodes();
    } catch (error) {
      console.log(error);
    }
  }, [fetchTopNodes]);

  return (
    <Stack
      bg={"#FFAFB"}
      display={"flex"}
      maxW={"80rem"}
      mx="auto"
      padding={{ base: "2rem", md: "4rem" }}
    >
      <Flex
        justifyContent={"space-between"}
        alignItems={"baseline"}
        direction={{ base: "column", sm: "row" }}
      >
        <Heading
          as={"h1"}
          fontSize={{ base: "1.1rem", md: "1.3rem", lg: "1.5rem" }}
          fontWeight={"extrabold"}
        >
          {title}
        </Heading>
        {buttonProps && (
          <Link
            color={"#0033CC"}
            fontWeight={"bold"}
            fontSize={{ base: "sm", md: "md", lg: "lg" }}
            onClick={() => {
              buttonProps.link && router.push(buttonProps.link);
            }}
          >
            {buttonProps.text} <ArrowForwardIcon color={"inherit"} />
          </Link>
        )}
      </Flex>
      <Grid
        gap={{ lg: 8 }}
        columnGap={{ md: 6 }}
        rowGap={{ base: "1.5rem", md: "6" }}
        templateRows={{
          base: "repeat(1,minmax(0,1fr)",
          md: `repeat(${nodes.length === 1 ? "1" : "2"}, minmax(0,1fr))`,
        }}
        templateColumns={{
          base: "repeat(1,minmax(0,1fr)",
          md: "repeat(2, minmax(0,1fr))",
        }}
        pb={"1em"}
        px={"1em"}
      >
        {nodes.length > 0 ? (
          nodes.map((node, i) => {
            return (
              <GridItem
                position={"relative"}
                key={`node-${node.id}`}
                rounded={"lg"}
                overflow={"hidden"}
                {...gridItemStyles[i]}
                {...(nodes.length === 1 && {
                  gridColumn: "1 / -1",
                  rowSpan: 1,
                  pb: { base: "65%", md: "50%" },
                })}
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
                  _hover={{ opacity: "75%", cursor: "pointer" }}
                  // placeholder url for categories page
                  onClick={() => router.push(`/categories/${node.id}`)}
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
                  bottom={"1rem"}
                  left={"2rem"}
                  zIndex={"100"}
                  position="absolute"
                  flexDirection={"column"}
                  justifyContent={"space-between"}
                >
                  <Heading fontSize={{ base: "md", md: "1.3rem", lg: "lg" }}>
                    {node.attributes.name}
                  </Heading>
                  <Text
                    fontWeight={"initial"}
                    fontSize={{ base: "sm", md: "0.9rem", lg: "1.1rem" }}
                  >
                    {node.attributes.description}
                  </Text>
                </Flex>
              </GridItem>
            );
          })
        ) : (
          <>
            {skeletonItemStyles &&
              skeletonItemStyles.map((skeletonProps, index) => {
                return index === 0 ? (
                  <GridItem rowSpan={2}>
                    <Skeleton {...skeletonProps} />
                  </GridItem>
                ) : (
                  <Skeleton {...skeletonProps} />
                );
              })}
          </>
        )}
      </Grid>
    </Stack>
  );
}
