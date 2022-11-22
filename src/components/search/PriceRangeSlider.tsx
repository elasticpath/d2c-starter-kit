import { MinusIcon } from "@chakra-ui/icons";
import {
  HStack,
  Input,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Stack,
} from "@chakra-ui/react";
import type {
  RangeConnectorParams,
  RangeWidgetDescription,
} from "instantsearch.js/es/connectors/range/connectRange";
import connectRange from "instantsearch.js/es/connectors/range/connectRange";
import { useConnector } from "react-instantsearch-hooks-web";
import { useState } from "react";

export type UseRangeSliderProps = RangeConnectorParams;

export default function PriceRangeSlider(
  props: UseRangeSliderProps
): JSX.Element {
  const useRangeSlider = (props?: UseRangeSliderProps) => {
    return useConnector<RangeConnectorParams, RangeWidgetDescription>(
      connectRange,
      props
    );
  };

  const { range, refine, canRefine } = useRangeSlider(props);
  const [inputValues, setInputValues] = useState<number[]>([
    range.min as number,
    range.max as number,
  ]);
  console.warn(range, "range");
  console.warn(inputValues, "inputValues");

  return (
    <Stack spacing={4} my={4}>
      <HStack justify="space-evenly">
        <Input
          type="number"
          placeholder="Min"
          w="80px"
          value={inputValues[0]}
          readOnly
        />
        <MinusIcon />
        <Input
          type="number"
          placeholder="Max"
          w="80px"
          value={inputValues[1]}
          readOnly
        />
      </HStack>
      <RangeSlider
        isDisabled={!canRefine}
        aria-label={["min", "max"]}
        min={Number(range.min)}
        max={Number(range.max)}
        defaultValue={[Number(range.min), Number(range.max)]}
        onChange={(val) => {
          setInputValues(val);
        }}
        onChangeEnd={(val) => {
          const [minVal, maxVal] = val;
          if (minVal && maxVal) {
            refine([minVal, maxVal]);
          }
        }}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} backgroundColor="gray.200" />
        <RangeSliderThumb index={1} backgroundColor="gray.200" />
      </RangeSlider>
    </Stack>
  );
}
