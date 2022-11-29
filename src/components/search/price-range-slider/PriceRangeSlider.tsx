import {
  HStack,
  Input,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Stack,
} from "@chakra-ui/react";
import { MinusIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import {
  Range,
  RangeBoundaries,
  RangeRenderState,
} from "instantsearch.js/es/connectors/range/connectRange";

interface ISlider extends RangeRenderState {}

function convertToTicks(start: RangeBoundaries, range: Range): number[] {
  const domain =
    range.min === 0 && range.max === 0
      ? { min: undefined, max: undefined }
      : range;

  return [
    start[0] === -Infinity ? domain.min! : start[0]!,
    start[1] === Infinity ? domain.max! : start[1]!,
  ];
}

const PriceRangeSlider = ({ refine, canRefine, range, start }: ISlider) => {
  const [inputValues, setInputValues] = useState<number[]>(
    convertToTicks(start, range)
  );
  const [prevStart, setPrevStart] = useState(start);

  useEffect(() => {
    setInputValues([range.min as number, range.max as number]);
  }, [range.min, range.max]);

  if (start !== prevStart) {
    setInputValues(convertToTicks(start, range));
    setPrevStart(start);
  }

  if (
    !canRefine ||
    inputValues[0] === undefined ||
    inputValues[1] === undefined
  ) {
    return null;
  }
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
        value={inputValues}
        onChange={(val) => {
          setInputValues(val);
        }}
        onChangeEnd={(val) => {
          const [minVal, maxVal] = val;
          if (minVal && maxVal) {
            console.warn(minVal, maxVal, "refine");
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
};

export default PriceRangeSlider;
