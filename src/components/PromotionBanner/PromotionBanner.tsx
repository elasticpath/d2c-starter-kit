import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { Promotion } from "@moltin/sdk";
import { useRouter } from "next/router";

interface IPromotion extends Promotion {
  "epcc-reference-promotion-image"?: string;
}

interface IPromotionBanner {
  linkProps?: {
    link: string;
    text: string;
  };
  promotion: IPromotion;
}

const PromotionBanner = (props: IPromotionBanner): JSX.Element => {
  const router = useRouter();
  const { linkProps, promotion } = props;

  const { name, description } = promotion;
  const imageUrl = promotion["epcc-reference-promotion-image"];

  let background;

  if (imageUrl) {
    background = {
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  } else {
    background = {
      backgroundColor: "gray.100",
    };
  }

  return (
    <>
      {
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          textAlign="center"
          height="72"
          {...background}
        >
          {name && (
            <Heading as="h1" size="4xl">
              {name}
            </Heading>
          )}
          {description && <Text>{description}</Text>}
          {linkProps && (
            <Button
              bg={"brand.primary"}
              color={"white"}
              _hover={{
                backgroundColor: "brand.secondary",
                boxShadow: "lg",
              }}
              variant="solid"
              mt="5"
              onClick={() => {
                router.push(linkProps.link);
              }}
            >
              {linkProps.text}
            </Button>
          )}
        </Box>
      }
    </>
  );
};

export default PromotionBanner;
