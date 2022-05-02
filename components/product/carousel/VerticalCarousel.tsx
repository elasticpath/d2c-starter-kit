import type { File } from "@moltin/sdk";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import {
  StyledButtonBack,
  StyledButtonNext,
  StyledImage,
} from "../../shared/carousel-wrapped";
import styles from "./ProductCarousel.module.css";

interface IVerticalCarousel {
  images: File[];
  visibleSlides: number;
  selectedProductImage: File;
  setSelectedProductImage: (file: File) => void;
}

const VerticalCarousel = ({
  images,
  visibleSlides,
  selectedProductImage,
  setSelectedProductImage,
}: IVerticalCarousel): JSX.Element => {
  const selectedStyle = styles["product-carousel-selected"];
  const baseStyle = styles["vertical-product-carousel-inner"];

  const getControlsDisplay = () =>
    images.length > visibleSlides ? "flex" : "none";

  return (
    <CarouselProvider
      visibleSlides={visibleSlides}
      totalSlides={images.length}
      step={1}
      orientation={"vertical"}
      naturalSlideWidth={80}
      naturalSlideHeight={100}
      infinite={images.length >= visibleSlides}
      dragEnabled={false}
    >
      <StyledButtonBack
        paddingBottom={"1rem"}
        display={getControlsDisplay()}
        justifyContent="center"
        py=".5rem"
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
            d="M112 328l144-144 144 144"
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
            <StyledImage
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
        display={getControlsDisplay()}
        justifyContent="center"
        py=".5rem"
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
            d="M112 184l144 144 144-144"
          ></path>
        </svg>
      </StyledButtonNext>
    </CarouselProvider>
  );
};

export default VerticalCarousel;
