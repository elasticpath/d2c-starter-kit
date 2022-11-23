import type {
  RangeConnectorParams,
  RangeWidgetDescription,
} from "instantsearch.js/es/connectors/range/connectRange";
import connectRange from "instantsearch.js/es/connectors/range/connectRange";
import { useConnector } from "react-instantsearch-hooks-web";
import PriceRangeSlider from "./PriceRangeSlider";

export type UseRangeSliderProps = RangeConnectorParams;

export default function PriceRangeSliderWrapper(
  props: UseRangeSliderProps
): JSX.Element {
  const useRangeSlider = (props?: UseRangeSliderProps) => {
    return useConnector<RangeConnectorParams, RangeWidgetDescription>(
      connectRange,
      props
    );
  };

  const data = useRangeSlider(props);

  console.warn(data, "data");

  return <PriceRangeSlider {...data} />;
}
