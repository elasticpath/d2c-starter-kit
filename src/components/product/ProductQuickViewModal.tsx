import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { ReactNode, useCallback } from "react";
import SimpleProductDetail from "./SimpleProduct";
import { IProduct } from "../../lib/product-types";
import BaseProductDetail from "./BaseProduct";
import ChildProductDetail from "./ChildProduct";
import { useCart } from "../../context/use-cart-hook";
import ProductCarousel from "./carousel/ProductCarousel";
import ProductSummary from "./ProductSummary";
import CartActions from "./CartActions";
import ProductVariations from "./ProductVariations";
import { useProduct } from "../../context/use-product-hook";
import { ProductPresentState } from "../../context/types/product-reducer-types";
import { ProductProvider } from "../../context/product-provider";

interface IProductQuickView {
  isOpen: boolean;
  onClose: () => void;
  productId?: string;
}

export default function ProductQuickViewModal({
  isOpen,
  onClose,
  productId,
}: IProductQuickView): JSX.Element {
  const { addProductToCart } = useCart();

  const handleAddToCart = useCallback(async () => {
    if (!productId) {
      return;
    }
    return addProductToCart(productId, 1);
  }, [productId, addProductToCart]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: "full", md: "xl", xl: "4xl" }}
    >
      {productId && (
        <ProductProvider product={productId}>
          <ProductQuickView handleAddToCart={handleAddToCart} />
        </ProductProvider>
      )}
    </Modal>
  );
}

function ProductQuickView({
  handleAddToCart,
}: {
  handleAddToCart: () => void;
}): JSX.Element {
  const { state, isProductPresent } = useProduct();
  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          {isProductPresent(state) && (
            <QuickViewContainer addToCart={handleAddToCart} product={state}>
              <p>{state.kind}</p>
              {state.kind === "child-product-present-state" &&
                state.variations && (
                  <ProductVariations
                    variations={state.variations}
                    variationsMatrix={state.variationsMatrix}
                    baseProductSlug={state.baseProduct.attributes.slug}
                    currentSkuId={state.product.id}
                  />
                )}
            </QuickViewContainer>
          )}
        </ModalBody>
      </ModalContent>
    </>
  );
}

function QuickViewContainer({
  children,
  product: { main_image, otherImages, product },
  addToCart,
}: {
  product: ProductPresentState;
  children?: ReactNode;
  addToCart: () => void;
}): JSX.Element {
  return (
    <SimpleGrid
      columns={{ base: 1, lg: 2 }}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 18, md: 24 }}
    >
      {main_image && (
        <ProductCarousel images={otherImages} mainImage={main_image} />
      )}
      <Stack spacing={{ base: 6, md: 10 }}>
        <ProductSummary product={product} />
        {children}
        <CartActions handleAddToCart={addToCart} />
      </Stack>
    </SimpleGrid>
  );
}

function resolveProductDetailComponent(
  props: IProduct,
  handleAddToCart: () => Promise<void>
): JSX.Element {
  switch (props.kind) {
    case "base-product":
      return (
        <BaseProductDetail
          baseProduct={props}
          handleAddToCart={handleAddToCart}
        />
      );
    case "child-product":
      return (
        <ChildProductDetail
          childProduct={props}
          handleAddToCart={handleAddToCart}
        />
      );
    case "simple-product":
      return (
        <SimpleProductDetail
          simpleProduct={props}
          handleAddToCart={handleAddToCart}
        />
      );
  }
}
