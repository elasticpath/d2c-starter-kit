import type { NextPage } from "next";
import styles from "../components/product/carousel/ProductCarousel.module.css";
import { CarouselProvider, Slide, Slider, Image } from "pure-react-carousel";
import {
  StyledButtonBack,
  StyledButtonNext,
} from "../components/shared/carousel-wrapped";
import "pure-react-carousel/dist/react-carousel.es.css";
import BarStoolImage from "../images/bar-stool.jpeg";
import BasketImage from "../images/basket.jpeg";
import BeltImage from "../images/belt.jpeg";
import LashesKitImage from "../images/lashes-kit.jpeg";
import PillowImage from "../images/pillow.jpeg";
import SanitizerImage from "../images/sanitizer.jpeg";
import SofaImage from "../images/sofa.jpeg";
import { Grid } from "@chakra-ui/react";
import LeftArrowIcon from "../components/product/carousel/icons/LeftArrowIcon";
import RightArrowIcon from "../components/product/carousel/icons/RightArrowIcon";
import { useState } from "react";

const Home: NextPage<{}> = () => {
  const images = [
    BarStoolImage,
    BasketImage,
    BeltImage,
    LashesKitImage,
    PillowImage,
    SanitizerImage,
    SofaImage,
  ];
  const selectedStyle = styles["product-carousel-selected"];
  const baseStyle = styles["horizontal-product-carousel-inner"];
  const visibleSlides = 5;
  const shouldDisplayControls = images.length > visibleSlides;
  const controlsDisplaySettings = shouldDisplayControls ? "flex" : "none";
  const [selectedProductImage, setSelectedProductImage] = useState(images[0]);

  return (
    <div>
      <main className={styles.main}>
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
            gridTemplateColumns={
              shouldDisplayControls ? "auto 1fr auto" : "1fr"
            }
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
              {images.map((image, index) => (
                <Slide
                  key={image.src}
                  index={index}
                  innerClassName={
                    image.src === selectedProductImage.src
                      ? `${selectedStyle} ${baseStyle}`
                      : baseStyle
                  }
                >
                  <Image
                    style={{ objectFit: "cover", borderRadius: "0.375rem" }}
                    hasMasterSpinner={false}
                    onClick={() => setSelectedProductImage(image)}
                    alt={image.src}
                    src={image.src}
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
      </main>
    </div>
  );
};

export default Home;
