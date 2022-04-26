import { Stack } from "@chakra-ui/react";
import type { Variation } from "@moltin/sdk";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { productContext } from "../../pages/products/[baseProductSlug]/[sku]";
import { getSkuFromOptions, VariationSkuLookup } from "../../services/helper";
import { getProductById } from "../../services/products";
import ProductVariation, { UpdateOptionHandler } from "./ProductVariation";

interface IProductVariations {
  variations: Variation[];
  skuLookup: VariationSkuLookup;
  baseProductSlug: string;
  currentSkuId: string;
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
  currentSkuId,
}: IProductVariations): JSX.Element => {
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>(optionLookupDict ? optionLookupDict : getDefaultEmptyOptions());
  const [routing, setRouting] = useState(false);
  const context = useContext(productContext);

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
    return !Object.entries(optionsDict).some(([_key, val]) => !val);
  }

  const router = useRouter();

  useEffect(() => {
    const selectedSkuId = getSkuFromOptions(skuLookup, selectedOptions);
    console.log("test: ", selectedOptions);
    if (
      selectedSkuId &&
      selectedSkuId !== currentSkuId &&
      allVariationsHaveSelectedOption(selectedOptions)
    ) {
      getProductById(selectedSkuId).then((productResp) => {
        console.log("this will trigger a route");
        context?.setIsChangingSku(true);
        router
          .push(
            `/products/${baseProductSlug}/${productResp.data.attributes.sku}`
          )
          .then(() => {
            setRouting(false);
            context?.setIsChangingSku(false);
            console.log("done routing");
          });
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
    <Stack opacity={routing ? "50" : "100"}>
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
