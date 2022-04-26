import { Flex, Grid, GridItem } from "@chakra-ui/react";
import type { File } from "@moltin/sdk";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Image,
  ImageWithZoom,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { useEffect, useState } from "react";

interface IProductCarousel {
  images: File[];
  mainImage: File | undefined;
}

const ProductCarousel = ({
  images,
  mainImage,
}: IProductCarousel): JSX.Element => {
  console.log("rendering product carousel: ", images, mainImage);
  // TODO remove this
  const someRandomExtraImages: File[] = [0, 1, 2].map(
    (v) =>
      ({
        id: v.toString(),
        file_name: `extra-${v}.jpg`,
        link: {
          href: `https://picsum.photos/seed/${v}/200/300`,
        },
      } as Partial<File>)
  ) as File[];

  const completeImages: File[] = [
    ...(mainImage ? [mainImage] : []),
    ...images,
    ...someRandomExtraImages,
  ];

  const [selectedProductImage, setSelectedProductImage] = useState(
    completeImages[0]
  );
  console.log("selected image: ", selectedProductImage);

  useEffect(() => {
    console.log("selected product image: ", selectedProductImage);
  }, [selectedProductImage]);

  const desiredVisibleSlides = 4;

  return (
    <Grid templateColumns="100px 1fr" gap={6}>
      <GridItem>
        <CarouselProvider
          visibleSlides={
            completeImages.length >= desiredVisibleSlides
              ? desiredVisibleSlides
              : completeImages.length
          }
          totalSlides={completeImages.length}
          step={1}
          orientation="vertical"
          naturalSlideWidth={100}
          naturalSlideHeight={100}
          hasMasterSpinner
          infinite={completeImages.length > 4}
          dragEnabled={false}
        >
          <Flex justify="center" py=".5rem">
            <ButtonBack>
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="up"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M890.5 755.3L537.9 269.2c-12.8-17.6-39-17.6-51.7 0L133.5 755.3A8 8 0 00140 768h75c5.1 0 9.9-2.5 12.9-6.6L512 369.8l284.1 391.6c3 4.1 7.8 6.6 12.9 6.6h75c6.5 0 10.3-7.4 6.5-12.7z"></path>
              </svg>
            </ButtonBack>
          </Flex>
          <Slider>
            <Grid gap={4} cursor={"cursor"}>
              {completeImages.map((imageFile, index) => (
                <GridItem
                  key={imageFile.id}
                  p="0.2rem"
                  border={
                    imageFile.id === selectedProductImage.id
                      ? "1px solid #858585"
                      : ""
                  }
                >
                  <Slide index={index}>
                    <Image
                      style={{ objectFit: "cover" }}
                      onClick={() => setSelectedProductImage(imageFile)}
                      hasMasterSpinner={true}
                      alt={imageFile.file_name}
                      src={imageFile.link.href}
                    />
                  </Slide>
                </GridItem>
              ))}
            </Grid>
          </Slider>
          <Flex justify="center" py=".5rem">
            <ButtonNext>
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="down"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
              </svg>
            </ButtonNext>
          </Flex>
        </CarouselProvider>
      </GridItem>
      <GridItem>
        <CarouselProvider
          visibleSlides={1}
          totalSlides={1}
          naturalSlideWidth={400}
          naturalSlideHeight={400}
          hasMasterSpinner={true}
        >
          <Slider>
            <Slide key={selectedProductImage.id} index={0}>
              <ImageWithZoom
                bgImageProps={{ style: { backgroundPosition: "center" } }}
                alt={selectedProductImage.file_name}
                src={selectedProductImage.link.href}
              />
            </Slide>
          </Slider>
        </CarouselProvider>
      </GridItem>
    </Grid>
  );
};

export default ProductCarousel;
/*

<Image
        rounded={"md"}
        alt={images[0].file_name}
        src={images[0].link.href}
        fit={"cover"}
        align={"center"}
        w={"100%"}
        h={{ base: "100%", sm: "400px", lg: "500px" }}
      />

      */
