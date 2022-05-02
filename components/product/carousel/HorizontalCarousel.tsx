import { Grid } from "@chakra-ui/react";
import type { File } from "@moltin/sdk";
import { CarouselProvider, Slider, Slide, Image } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import {
  StyledButtonBack,
  StyledButtonNext,
} from "../../shared/carousel-wrapped";
import styles from "./ProductCarousel.module.css";

interface IHorizontalCarousel {
  images: File[];
  visibleSlides: number;
  selectedProductImage: File;
  setSelectedProductImage: (file: File) => void;
}

const HorizontalCarousel = ({
  images,
  visibleSlides,
  selectedProductImage,
  setSelectedProductImage,
}: IHorizontalCarousel): JSX.Element => {
  const selectedStyle = styles["product-carousel-selected"];
  const baseStyle = styles["horizontal-product-carousel-inner"];

  const shouldDisplayControls = images.length > visibleSlides;
  const controlsDisplaySettings = shouldDisplayControls ? "flex" : "none";

  return (
    <CarouselProvider
      visibleSlides={visibleSlides}
      totalSlides={images.length}
      step={1}
      orientation={"horizontal"}
      naturalSlideWidth={45}
      naturalSlideHeight={40}
      infinite={images.length >= visibleSlides}
      dragEnabled={false}
    >
      <Grid
        gridTemplateColumns={shouldDisplayControls ? "auto 1fr auto" : "1fr"}
        gap={4}
        alignItems={"center"}
      >
        <StyledButtonBack
          display={controlsDisplaySettings}
          justifyContent={"center"}
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
        <Slider>
          {images.map((imageFile, index) => (
            <Slide
              key={imageFile.id}
              index={index}
              innerClassName={
                imageFile.id === selectedProductImage.id
                  ? `${selectedStyle} ${baseStyle}`
                  : baseStyle
              }
            >
              <Image
                style={{ objectFit: "cover", borderRadius: "0.375rem" }}
                onClick={() => setSelectedProductImage(imageFile)}
                hasMasterSpinner={false}
                alt={imageFile.file_name}
                src={imageFile.link.href}
              />
            </Slide>
          ))}
        </Slider>
        <StyledButtonNext
          display={controlsDisplaySettings}
          justifyContent="center"
          w="full"
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
      </Grid>
    </CarouselProvider>
  );
};

export default HorizontalCarousel;
