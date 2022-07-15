import React, { useState, useEffect } from "react";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { getPromotionById } from "../../services/promotions";
import { Promotion, Resource } from "@moltin/sdk";
import { useRouter } from "next/router";

interface IPromotionBanner {
  promotionId: string;
  buttonText?: string;
  buttonLink?: string;
}

const basicBoxStyles = {
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  position: "relative",
  height: "400px",
  backgroundImage: "linear-gradient(#0033CCad, #CBD5F400)",
};

const textBoxStyles = {
  textAlign: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "black",
};

const PromotionBanner = ({
  buttonText,
  promotionId,
  buttonLink,
}: IPromotionBanner): JSX.Element => {
  const router = useRouter();
  const [promotionData, setPromotionData] = useState<Promotion>();

  useEffect(() => {
    async function fetchPromotion() {
      const { data }: Resource<Promotion> = await getPromotionById(promotionId);
      setPromotionData(data);
    }
    try {
      fetchPromotion();
    } catch (error) {
      console.log(error);
    }
  }, [promotionId]);

  return (
    <>
      {promotionData ? (
        <Box sx={basicBoxStyles}>
          <Box sx={textBoxStyles}>
            <Heading as="h1" size="4xl">
              {promotionData?.name}
            </Heading>
            <Text> {promotionData?.description}</Text>
            {buttonText && (
              <Button
                width="140px"
                bg={"blue.900"}
                color={"white"}
                _hover={{
                  backgroundColor: "blue.700",
                  boxShadow: "m",
                }}
                variant="solid"
                mt="5"
                onClick={() => {
                  buttonLink && router.push(buttonLink);
                }}
              >
                {buttonText}
              </Button>
            )}
          </Box>
        </Box>
      ) : (
        ""
      )}
    </>
  );
};

export default PromotionBanner;
