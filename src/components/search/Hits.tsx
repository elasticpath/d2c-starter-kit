import { Grid, GridItem } from "@chakra-ui/react";
import NoResults from "./NoResults";
import HitComponent from "./Hit";
import { SearchHit } from "./SearchHit";

interface IHitsProps {
  hits: SearchHit[];
}

export default function Hits({ hits }: IHitsProps): JSX.Element {
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
