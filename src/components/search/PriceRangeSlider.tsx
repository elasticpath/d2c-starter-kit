import { MinusIcon } from "@chakra-ui/icons";
import {
  Box,
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

  const { start, range, refine, canRefine } = useRangeSlider(props);

  const [min, max] = start;

  const [inputValues, setInputValues] = useState<number[]>([]);

  return (
    <Stack spacing={4} my={4}>
      <HStack justify="space-evenly">
        <Input
          type="number"
          placeholder="Min"
          w="80px"
          value={inputValues[0]}
          defaultValue={min && isFinite(min) ? min : range.min}
          readOnly
        />
        <MinusIcon />
        <Input
          type="number"
          placeholder="Max"
          w="80px"
          value={inputValues[1]}
          defaultValue={max && isFinite(max) ? max : range.max}
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
