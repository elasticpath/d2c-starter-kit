import { Image } from "@chakra-ui/react";
import type { File } from "@moltin/sdk";

interface IProductThumbnail {
  imageFile: File;
}

const ProductThumbnail = ({ imageFile }: IProductThumbnail): JSX.Element => {
  return (
    <Image
      rounded={"md"}
      alt={imageFile.file_name}
      src={imageFile.link.href}
      fit={"cover"}
      align={"center"}
      w={"100%"}
      h={{ base: "100%", sm: "400px", lg: "500px" }}
    />
  );
};

export default ProductThumbnail;
