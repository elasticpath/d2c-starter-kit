import { Container } from "@chakra-ui/react";
import type { ProductResponse, File } from "@moltin/sdk";
import type { NextPage } from "next";
import ProductDetail from "../../../components/product/Product";
import { useCartData } from "../../../context/state";
import { addToCart } from "../../../services/cart";

interface ISku {
  product: ProductResponse;
  main_image: File | null;
}

export const Sku: NextPage<ISku> = ({ product, main_image }: ISku) => {
  const { updateCartItems, setCartQuantity } = useCartData();

  const handleAddToCart = () => {
    // TODO const mcart = localStorage.getItem("mcart") || "";
    return addToCart(product.id, 1)
      .then(() => {
        updateCartItems();

        // updateCartData();
        setCartQuantity(1);
      })
      .finally(() => {});
  };

  return (
    <Container maxW={"7xl"}>
      <ProductDetail
        product={product}
        main_image={main_image}
        handleAddToCart={handleAddToCart}
      />
    </Container>
  );
};

export default Sku;
