import Hits from "./Hits";
import { ProductSearchResultItems } from "./search-hit-types";

export interface IHitsProps {
  hits?: ProductSearchResultItems[];
}

export default function HitsProvider({ hits = [] }: IHitsProps) {
  return <Hits hits={hits} />;
}
