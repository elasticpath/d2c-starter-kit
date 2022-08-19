import { ViewOffIcon } from "@chakra-ui/icons";
import {
  Center,
  Grid,
  GridItem,
  Heading,
  LinkBox,
  LinkOverlay,
  Image,
  Text,
} from "@chakra-ui/react";
import { useHits } from "react-instantsearch-hooks-web";
import { SearchHit } from "./SearchHit";
import Link from "next/link";
import NoResults from "./NoResults";

export default function Hits(): JSX.Element {
  const { hits } = useHits<SearchHit>();

  const HitComponent = ({ hit }: { hit: SearchHit }) => {
    const {
      ep_price,
      ep_name,
      ep_slug,
      objectID,
      ep_main_image_url,
      ep_description,
    } = hit;
    return (
      <LinkBox display={"grid"} gridTemplateRows="auto 1fr" h="full">
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
            <Link href={`/products/${ep_slug}/${objectID}`} passHref>
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
            {ep_price}
          </Text>
        </Grid>
      </LinkBox>
    );
  };

  if (hits.length) {
    return (
      <Grid
        maxW="7xl"
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        columnGap={4}
        rowGap={8}
      >
        {hits.map((hit) => (
          <GridItem
            key={hit.objectID}
            gridAutoRows="1fr"
            border="1px"
            borderColor="gray.200"
            rounded="lg"
          >
            <HitComponent hit={hit} />
          </GridItem>
        ))}
      </Grid>
    );
  }
  return <NoResults displayIcon={false} />;
}
