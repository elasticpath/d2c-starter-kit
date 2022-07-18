import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Box, Button, Heading, Skeleton, Text } from "@chakra-ui/react";
import { getPromotionById } from "../../services/promotions";
import { Promotion } from "@moltin/sdk";
import { useRouter } from "next/router";

export type PromotionBannerSpec = string | Promotion;

interface IPromotionBanner {
  promotionSpec: PromotionBannerSpec;
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
  promotionSpec,
  buttonLink,
}: IPromotionBanner): JSX.Element => {
  const router = useRouter();

  const [promotionData, setPromotionData] = useState<Promotion | undefined>(
    typeof promotionSpec === "string" ? undefined : promotionSpec
  );

  const promotionId = useMemo(
    () =>
      typeof promotionSpec === "string" ? promotionSpec : promotionSpec.id,
    [promotionSpec]
  );

  const fetchPromotion = useCallback(async () => {
    const { data } = await getPromotionById(promotionId);
    setPromotionData(data);
  }, [setPromotionData, promotionId]);

  useEffect(() => {
    try {
      fetchPromotion();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, [fetchPromotion]);

  const { name, description } = promotionData || {};

  return (
    <>
      {
        <Box sx={basicBoxStyles}>
          <Box sx={textBoxStyles}>
            {name ? (
              <Heading as="h1" size="4xl">
                {name}
              </Heading>
            ) : (
              <Skeleton
                width="50"
                marginBottom="2"
                startColor="blue.500"
                endColor="blue.400"
                height="72px"
              />
            )}
            {description ? (
              <Text>{description}</Text>
            ) : (
              <Skeleton
                startColor="blue.500"
                endColor="blue.400"
                height="24px"
              />
            )}
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
      }
    </>
  );
};

export default PromotionBanner;
