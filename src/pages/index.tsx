import type { GetStaticProps, NextPage } from "next";
import { CarouselProvider, Slide, Slider, Image } from "pure-react-carousel";
import {
  StyledButtonBack,
  StyledButtonNext,
  StyledSlide,
} from "../components/shared/carousel-wrapped";
import "pure-react-carousel/dist/react-carousel.es.css";

import { Button, Grid, Text, Box, GridItem, chakra } from "@chakra-ui/react";
import LeftArrowIcon from "../components/product/carousel/icons/LeftArrowIcon";
import RightArrowIcon from "../components/product/carousel/icons/RightArrowIcon";
import { StaticProduct, staticProducts } from "../lib/product-data";
import styles from "../styles/Home.module.css";

export interface IHome {
  products: StaticProduct[];
}

const Home: NextPage<IHome> = ({ products }) => {
  const visibleSlides = 1;

  return (
    <chakra.main py="4rem">
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
              <StyledSlide
                innerClassName={styles["horizontal-product-carousel-inner"]}
                key={imageSrc}
                index={index}
                cursor="pointer"
              >
                <Grid
                  gridTemplateColumns={"1fr 2fr"}
                  gap={"3.125rem"}
                  alignItems="center"
                >
                  <GridItem flex="1 1 0">
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
                  </GridItem>
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
                    renderLoading={() => (
                      <Box w={"full"} h={"full"} bgColor={"black"}></Box>
                    )}
                  />
                </Grid>
              </StyledSlide>
            ))}
          </Slider>
          <StyledButtonNext display={"flex"} justifyContent="center" w="full">
            <RightArrowIcon />
          </StyledButtonNext>
        </Grid>
      </CarouselProvider>
    </chakra.main>
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
