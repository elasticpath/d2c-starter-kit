import { Box, Flex, Image } from "@chakra-ui/react";
import type { File } from "@moltin/sdk";
import ProductThumbnail from "./ProductThumbnail";

interface IProductImages {
  main_image: File;
  otherImages: File[];
}

const ProductImages = ({
  main_image,
  otherImages,
}: IProductImages): JSX.Element => {
  return (
    <>
      <Flex>
        <Image
          rounded={"md"}
          alt={"product image"}
          src={main_image.link.href}
          fit={"cover"}
          align={"center"}
          w={"100%"}
          h={{ base: "100%", sm: "400px", lg: "500px" }}
        />
      </Flex>
      <Box>
        {otherImages.map((x) => (
          <ProductThumbnail key={x.id} imageFile={x} />
        ))}
      </Box>
    </>
  );
};

export default ProductImages;
