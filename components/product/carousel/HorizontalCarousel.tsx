import { Grid } from "@chakra-ui/react";
import type { File } from "@moltin/sdk";
import { CarouselProvider, Slider, Slide, Image } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import {
  StyledButtonBack,
  StyledButtonNext,
} from "../../shared/carousel-wrapped";
import LeftArrowIcon from "./icons/LeftArrowIcon";
import RightArrowIcon from "./icons/RightArrowIcon";
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
          <LeftArrowIcon />
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
          <RightArrowIcon />
        </StyledButtonNext>
      </Grid>
    </CarouselProvider>
  );
};

export default HorizontalCarousel;
