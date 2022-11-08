import Hits from "./Hits";
import { SearchHit } from "./SearchHit";

export interface IHitsProps {
  hits?: SearchHit[];
}

export default function HitsProvider({ hits = [] }: IHitsProps) {
  return <Hits hits={hits} />;
}
