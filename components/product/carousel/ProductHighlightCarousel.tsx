import { Box } from "@chakra-ui/react";
import type { File } from "@moltin/sdk";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import {
  StyledButtonBack,
  StyledButtonNext,
  StyledImage,
  StyledImageWithZoom,
} from "../../shared/carousel-wrapped";

interface IProductHighlightCarousel {
  images: File[];
  selectedProductImage: File;
  setSelectedProductImage: (file: File) => void;
}

const ProductHighlightCarousel = ({
  images,
  selectedProductImage,
  setSelectedProductImage,
}: IProductHighlightCarousel): JSX.Element => {
  const selectedImageIndex = images.findIndex(
    (img) => img.id === selectedProductImage.id
  );

  const selectPrevImage = (currentIndex: number) =>
    setSelectedProductImage(images[currentIndex - 1]);

  const selectNextImage = (currentIndex: number) =>
    setSelectedProductImage(images[currentIndex + 1]);

  return (
    <CarouselProvider
      visibleSlides={1}
      totalSlides={images.length}
      currentSlide={selectedImageIndex}
      naturalSlideWidth={400}
      naturalSlideHeight={400}
      hasMasterSpinner={true}
      dragEnabled={false}
    >
      <Box
        display={{ base: "flex", md: "none" }}
        opacity={0}
        position={"absolute"}
        zIndex={1}
        alignItems="center"
        h={"full"}
        w={"full"}
        px={4}
        _hover={{ opacity: 100 }}
      >
        <StyledButtonBack
          display={selectedImageIndex < 1 ? "none" : "flex"}
          justifyContent={"center"}
          alignItems={"center"}
          backgroundColor={"white"}
          rounded={"full"}
          w={"2rem"}
          h={"2rem"}
          onClick={() => selectPrevImage(selectedImageIndex)}
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            aria-hidden="true"
            focusable="false"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="48"
              d="M328 112L184 256l144 144"
            ></path>
          </svg>
        </StyledButtonBack>
        <StyledButtonNext
          display={selectedImageIndex + 1 === images.length ? "none" : "flex"}
          justifyContent={"center"}
          alignItems={"center"}
          backgroundColor={"white"}
          rounded={"full"}
          w={"2rem"}
          h={"2rem"}
          marginLeft={"auto"}
          onClick={() => selectNextImage(selectedImageIndex)}
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            aria-hidden="true"
            focusable="false"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="48"
              d="M184 112l144 144-144 144"
            ></path>
          </svg>
        </StyledButtonNext>
      </Box>
      <Slider>
        {images.map((imageFile, index) => (
          <Slide key={imageFile.id} index={index}>
            <StyledImage
              display={{ base: "block", md: "none" }}
              objectFit="cover"
              objectPosition="center"
              hasMasterSpinner={true}
              alt={imageFile.file_name}
              src={imageFile.link.href}
            />
            <StyledImageWithZoom
              bgImageProps={{
                style: {
                  backgroundPosition: "center",
                  borderRadius: "0.375rem",
                },
              }}
              display={{ base: "none", md: "block" }}
              alt={imageFile.file_name}
              src={imageFile.link.href}
            />
          </Slide>
        ))}
      </Slider>
    </CarouselProvider>
  );
};

export default ProductHighlightCarousel;
