import React from "react";
import type { NextPage } from "next";
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
import { Button, Grid, Text, Box } from "@chakra-ui/react";
import LeftArrowIcon from "../components/product/carousel/icons/LeftArrowIcon";
import RightArrowIcon from "../components/product/carousel/icons/RightArrowIcon";
import styles from "../styles/Home.module.css";

const Home: NextPage<{}> = () => {
  const visibleSlides = 1;
  const products = [
    {
      image: BarStoolImage,
      title: "Riviera Bar & Counter Stools",
      subTitle:
        "The classic Parisian bistro chair, reinvented. True to its roots, each rattan frame is crafted in a time-honored technique perfected by the French, bent and shaped by hand until the iconic shape is achieved.",
    },
    {
      image: SofaImage,
      title: "Edgewater Sofa",
      subTitle:
        "This luxurious performance fabric has a thick weave for great texture and a casual look. Woven from 100% solution dyed acrylic, it will resist all manner of wear and tear - staining, mold, and UV radiation.",
    },
    {
      image: BasketImage,
      title: "Solid La Jolla Basket",
      subTitle:
        "These lidded baskets give storage a beachy spin, with strips of recycled resin wrapped around coils of natural seagrass. Inspired by traditional market baskets, the lightweight design is durable and features...",
    },
    {
      image: PillowImage,
      title: "Granada Pillow Cover",
      subTitle:
        "Inspired by a botanical print from our travels, we pumped up the scale and played with vibrant contrasts to come up with this statement pattern. We love it as the single bold accent in the room, or made more lush by a sea of solids in a complementary hue. With hand-embroidered metallic threads, an exposed brass zip, and a tassel pull, this is clearly all about the details (as any indispensable pillow should be).",
    },
    {
      image: BeltImage,
      title: "Newman Reversible Leather Belt",
      subTitle:
        "Polished geometric buckle hardware provides a smart finish to a fine-grain leather belt that reverses from black to brown.",
    },
    {
      image: LashesKitImage,
      title: "Lashes Kit",
      subTitle: "A trio of best-selling products to perfect your lashes.",
    },
    {
      image: SanitizerImage,
      title: "Travel Size Hand Sanitizer Trio",
      subTitle:
        "An exclusive set featuring three travel-size organic hand sanitizers blended with 70% alcohol derived from organic sugarcane.",
    },
  ];

  return (
    <main className={styles.main}>
      <CarouselProvider
        visibleSlides={visibleSlides}
        totalSlides={products.length}
        step={1}
        orientation={"horizontal"}
        naturalSlideWidth={60}
        naturalSlideHeight={40}
        infinite={products.length >= visibleSlides}
        dragEnabled={false}
      >
        <Grid
          gridTemplateColumns={"auto 1fr auto"}
          gap={12}
          alignItems={"center"}
          width={"80%"}
          margin={"0 auto"}
        >
          <StyledButtonBack display={"flex"} justifyContent={"center"}>
            <LeftArrowIcon />
          </StyledButtonBack>
          <Slider>
            {products.map(({ image, title, subTitle }, index) => (
              <Slide
                key={image.src}
                index={index}
                innerClassName={styles["horizontal-product-carousel-inner"]}
              >
                <Box flex="1 1 0">
                  <Text fontSize="18px" fontWeight="500">
                    {title}
                  </Text>
                  <Text fontSize="16px" mt="20px">
                    {subTitle}
                  </Text>
                  <Button
                    bg={"blue.900"}
                    color={"white"}
                    _hover={{
                      backgroundColor: "blue.700",
                      boxShadow: "m",
                    }}
                    variant="solid"
                    mt="20px"
                  >
                    Show Now
                  </Button>
                </Box>
                <Image
                  style={{
                    objectFit: "cover",
                    borderRadius: "0.375rem",
                    maxHeight: "500px",
                    flex: "2 1 0",
                  }}
                  hasMasterSpinner={false}
                  alt={image.src}
                  src={image.src}
                />
              </Slide>
            ))}
          </Slider>
          <StyledButtonNext display={"flex"} justifyContent="center" w="full">
            <RightArrowIcon />
          </StyledButtonNext>
        </Grid>
      </CarouselProvider>
    </main>
  );
};

export default Home;
