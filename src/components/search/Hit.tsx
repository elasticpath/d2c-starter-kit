import { SearchHit } from "./SearchHit";
import {
  Button,
  Center,
  Grid,
  GridItem,
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react";
import { ViewOffIcon } from "@chakra-ui/icons";
import Link from "next/link";

export default function HitComponent({
  hit,
  openQuickView,
}: {
  hit: SearchHit;
  openQuickView: (productId: string) => void;
}): JSX.Element {
  const { ep_price, ep_name, objectID, ep_main_image_url, ep_description } =
    hit;

  return (
    <LinkBox display="grid" gridTemplateRows="auto 1fr" h="full">
      <GridItem position="relative" overflow="hidden" pb="100%">
        {ep_main_image_url ? (
          <Image
            boxSize="100%"
            position="absolute"
            objectFit="cover"
            src={ep_main_image_url}
            alt={ep_name}
            roundedTop="lg"
          />
        ) : (
          <Center
            w="100%"
            h="100%"
            bg="gray.200"
            color="white"
            position="absolute"
          >
            <ViewOffIcon w="10" h="10" />
          </Center>
        )}
      </GridItem>
      <Grid gridTemplateRows="auto 1fr auto" gap={2} p={4}>
        <Heading size="sm">
          <Link href={`/products/${objectID}`} passHref>
            <LinkOverlay>{ep_name}</LinkOverlay>
          </Link>
        </Heading>
        <Text
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          mt="1"
          noOfLines={6}
        >
          {ep_description}
        </Text>
        <Text fontSize="md" fontWeight="semibold" mt="1">
          {ep_price ? ep_price["USD"].formatted_price : "Unknown"}
        </Text>
        <Button onClick={() => openQuickView(objectID)}>Add to cart</Button>
      </Grid>
    </LinkBox>
  );
}
