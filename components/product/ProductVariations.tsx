import { Stack } from "@chakra-ui/react";
import type { Variation } from "@moltin/sdk";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getSkuFromOptions, VariationSkuLookup } from "../../services/helper";
import { getProductById } from "../../services/products";
import ProductVariation, { UpdateOptionHandler } from "./ProductVariation";

interface IProductVariations {
  variations: Variation[];
  skuLookup: VariationSkuLookup;
  baseProductSlug: string;
  optionLookupDict?: { [key: string]: string };
}

const getSelectedOption = (
  variationId: string,
  optionLookupObj: { [key: string]: string }
): string => {
  return optionLookupObj[variationId];
};

const ProductVariations = ({
  variations,
  optionLookupDict,
  skuLookup,
  baseProductSlug,
}: IProductVariations): JSX.Element => {
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>(optionLookupDict ? optionLookupDict : getDefaultEmptyOptions());

  // TODO broken, need to decide how to handle when the product has no options set.
  function getDefaultEmptyOptions(): { [key: string]: string } {
    return variations.reduce((acc, variation) => {
      return {
        ...acc,
        [variation.id]: undefined,
      };
    }, {});
  }

  function allVariationsHaveSelectedOption(optionsDict: {
    [key: string]: string;
  }): boolean {
    const temp = !Object.entries(optionsDict).some(([_key, val]) => !val);
    console.log("all vari: ", temp);
    return temp;
  }

  const router = useRouter();

  useEffect(() => {
    const selectedSkuId = getSkuFromOptions(skuLookup, selectedOptions);
    console.log("test: ", selectedOptions);
    if (selectedSkuId && allVariationsHaveSelectedOption(selectedOptions)) {
      getProductById(selectedSkuId).then((productResp) => {
        router.push(
          `/products/${baseProductSlug}/${productResp.data.attributes.sku}`
        );
      });
    }
  }, [selectedOptions]);

  const updateOptionHandler: UpdateOptionHandler =
    (variationId) =>
    (optionId): void => {
      for (const selectedOptionKey of Object.keys(selectedOptions)) {
        console.log("testing: ", variationId, optionId, selectedOptionKey);
        if (selectedOptionKey === variationId) {
          setSelectedOptions({
            ...selectedOptions,
            [selectedOptionKey]: optionId,
          });
          break;
        }
      }
    };
  return (
    <Stack>
      {variations.map((v) => (
        <ProductVariation
          key={v.id}
          variation={v}
          updateOptionHandler={updateOptionHandler}
          selectedOptionId={getSelectedOption(v.id, selectedOptions)}
        />
      ))}
    </Stack>
  );
};

export default ProductVariations;
