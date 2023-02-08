import type { NextPage } from "next";
import {
  chakra,
  Grid,
  GridItem,
  Box,
  Flex,
  Text,
  Button,
  Image,
  Circle,
} from "@chakra-ui/react";

import type { Promotion } from "@moltin/sdk";
import { ProductResponseWithImage } from "../lib/types/product-types";

import PromotionBanner from "../components/promotion-banner/PromotionBanner";
import { fetchFeaturedPromotion } from "../components/promotion-banner/fetchFeaturedPromotion";

import FeaturedProducts from "../components/featured-products/FeaturedProducts";
import { fetchFeaturedProducts } from "../components/featured-products/fetchFeaturedProducts";

import { withStoreStaticProps } from "../lib/store-wrapper-ssg";

const nodeId = process.env.NEXT_PUBLIC_DEMO_NODE_ID || "";
const promotionId = process.env.NEXT_PUBLIC_DEMO_PROMO_ID || "";

export interface IHome {
  promotion?: Promotion;
  featuredProducts?: ProductResponseWithImage[];
}

// const Home: NextPage<IHome> = ({ promotion, featuredProducts }) => {
const Home: NextPage<IHome> = () => {
  return (
    // <chakra.main>
    //   {promotion && (
    //     <PromotionBanner
    //       promotion={promotion}
    //       linkProps={{
    //         link: "/cart",
    //         text: "Shop Now",
    //       }}
    //     />
    //   )}
    //   <Grid gap="12" padding={{ base: "2rem", md: "4rem" }}>
    //     <GridItem>
    //       {featuredProducts && (
    //         <FeaturedProducts
    //           title="Trending Products"
    //           linkProps={{
    //             link: `/search`,
    //             text: "See all products",
    //           }}
    //           type="provided"
    //           products={featuredProducts}
    //         />
    //       )}
    //     </GridItem>
    //   </Grid>
    // </chakra.main>
    <>
      <Box
        bgImage="./images/landing_1.jpg"
        bgPos="top"
        bgSize="cover"
        width="100%"
        minHeight="550px"
        p={6}
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
      >
        <Box maxWidth="500px" p={4} textAlign="left" marginRight="50px">
          <Text fontSize="3xl" color="black">
            Welcome to Elastic Path
          </Text>
          <Text fontSize="3xl" color="black">
            We&apos;re so glad you&apos;ve joined us
          </Text>
          <br />
          <Text fontSize="lg" color="black">
            You&apos;ve joined the team and now it&apos;s time to use your
            Elastic Path swag proudly! EP Swag offers comfortable clothing
            basics to office necessities.
          </Text>
          <br />
          <Text fontSize="lg" color="black">
            Click Get Started to start shopping!
          </Text>
          <br />
          <br />
          <Box textAlign="right">
            <Button
              size="lg"
              backgroundColor="#D37422"
              color="white"
              width="200px"
            >
              get started
            </Button>
          </Box>
        </Box>
      </Box>

      <Grid
        templateColumns="repeat(4, 1fr)"
        background="#ECE5E1"
        padding="20px"
        justifyItems="center"
      >
        <Text fontSize="3xl">choose your own path</Text>
        <Box display="flex" alignItems="center">
          <Circle
            size="30px"
            bg="#0033CC"
            color="white"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize="20px">1</Text>
          </Circle>
          <Text fontSize="md" fontWeight="semibold" ml={2}>
            click get started
          </Text>
        </Box>
        <Box display="flex" alignItems="center">
          <Circle
            size="30px"
            bg="#0033CC"
            color="white"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize="20px">2</Text>
          </Circle>
          <Text fontSize="md" fontWeight="semibold" ml={2}>
            pick your gifts
          </Text>
        </Box>
        <Box display="flex" alignItems="center">
          <Circle
            size="30px"
            bg="#0033CC"
            color="white"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text fontSize="20px">3</Text>
          </Circle>
          <Text fontSize="md" fontWeight="semibold" ml={2}>
            checkout with your code
          </Text>
        </Box>
      </Grid>

      <Grid templateColumns="repeat(4, 1fr)" background="#F5F5F5">
        <Box padding="15px">
          <Image src="./images/cat1.png" alt="Lifestyle" />
          <Text fontSize="md" fontWeight="semibold" align="center">
            lifestyle
          </Text>
        </Box>
        <Box padding="15px">
          <Image src="./images/cat2.png" alt="Office Accessories" />
          <Text fontSize="md" fontWeight="semibold" align="center">
            office accessories
          </Text>
        </Box>
        <Box padding="15px">
          <Image src="./images/cat3.png" alt="Clothing" />
          <Text fontSize="md" fontWeight="semibold" align="center">
            clothing
          </Text>
        </Box>
        <Box
          bgImage="./images/landing_2.jpg"
          bgPos="top"
          bgSize="cover"
          width="100%"
          display="flex"
          alignItems="flex-end"
          justifyContent="center"
          paddingBottom="40px"
        >
          <Button
            size="lg"
            backgroundColor="#D37422"
            color="white"
            width="200px"
          >
            get started
          </Button>
        </Box>
      </Grid>
    </>
  );
};

export const getStaticProps = withStoreStaticProps<IHome>(async () => {
  // Fetching static data for the home page
  const promotion = promotionId
    ? await fetchFeaturedPromotion(promotionId)
    : undefined;
  const featuredProducts = nodeId
    ? await fetchFeaturedProducts(nodeId)
    : undefined;

  return {
    props: {
      ...(promotion && { promotion }),
      ...(featuredProducts && { featuredProducts }),
    },
  };
});

export default Home;
