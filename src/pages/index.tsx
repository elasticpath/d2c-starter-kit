import React from "react";
import type { GetStaticProps, NextPage } from "next";
import { CarouselProvider, Slide, Slider, Image } from "pure-react-carousel";
import {
  StyledButtonBack,
  StyledButtonNext,
} from "../components/shared/carousel-wrapped";
import "pure-react-carousel/dist/react-carousel.es.css";

import { Button, Grid, Text, Box } from "@chakra-ui/react";
import LeftArrowIcon from "../components/product/carousel/icons/LeftArrowIcon";
import RightArrowIcon from "../components/product/carousel/icons/RightArrowIcon";
import styles from "../styles/Home.module.css";
import { StaticProduct, staticProducts } from "../lib/product-data";

export interface IHome {
  products: StaticProduct[];
}

const Home: NextPage<IHome> = ({ products }) => {
  const visibleSlides = 1;

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
            {products.map(({ imageSrc, title, subTitle }, index) => (
              <Slide
                key={imageSrc}
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
                  alt={imageSrc}
                  src={imageSrc}
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

export const getStaticProps: GetStaticProps<IHome> = async () => {
  return {
    props: {
      products: staticProducts,
    },
  };
};

export default Home;
