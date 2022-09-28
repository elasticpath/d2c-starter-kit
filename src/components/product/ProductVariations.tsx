import { Stack } from "@chakra-ui/react";
import type { CatalogsProductVariation } from "@moltin/sdk";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { OptionDict } from "../../lib/product-types";
import { createEmptyOptionDict } from "../../lib/product-util";
import {
  allVariationsHaveSelectedOption,
  getOptionsFromSkuId,
  getSkuIdFromOptions,
  mapOptionsToVariation,
  MatrixObjectEntry,
} from "../../services/helper";
import ProductVariation, { UpdateOptionHandler } from "./ProductVariation";
import { useProduct } from "../../context/use-product-hook";

interface IProductVariations {
  variations: CatalogsProductVariation[];
  variationsMatrix: MatrixObjectEntry;
  baseProductSlug: string;
  currentSkuId: string;
  skuOptions?: string[];
}

const getSelectedOption = (
  variationId: string,
  optionLookupObj: OptionDict
): string => {
  return optionLookupObj[variationId];
};

const ProductVariations = ({
  variations,
  baseProductSlug,
  currentSkuId,
  variationsMatrix,
}: IProductVariations): JSX.Element => {
  const { state, routeToProduct } = useProduct();

  const currentSkuOptions = getOptionsFromSkuId(currentSkuId, variationsMatrix);
  const initialOptions = currentSkuOptions
    ? mapOptionsToVariation(currentSkuOptions, variations)
    : createEmptyOptionDict(variations);

  const [selectedOptions, setSelectedOptions] =
    useState<OptionDict>(initialOptions);
  const router = useRouter();

  useEffect(() => {
    const selectedSkuId = getSkuIdFromOptions(
      Object.values(selectedOptions),
      variationsMatrix
    );

    if (
      selectedSkuId &&
      selectedSkuId !== currentSkuId &&
      allVariationsHaveSelectedOption(selectedOptions, variations)
    ) {
      routeToProduct(selectedSkuId, (id) => {
        return router.push(`/products/${id}`).then(() => {
          return;
        });
      });
    }
  }, [
    routeToProduct,
    selectedOptions,
    baseProductSlug,
    currentSkuId,
    router,
    variations,
    variationsMatrix,
  ]);

  const updateOptionHandler: UpdateOptionHandler =
    (variationId) =>
    (optionId): void => {
      for (const selectedOptionKey in selectedOptions) {
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
    <Stack opacity={state.kind === "changing-product-state" ? "50" : "100"}>
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
