import { Flex, Image } from "@chakra-ui/react";
import type { File } from "@moltin/sdk";

interface IProductImages {
  main_image: File;
}

const ProductImages = ({ main_image }: IProductImages): JSX.Element => {
  return (
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
  );
};

export default ProductImages;
