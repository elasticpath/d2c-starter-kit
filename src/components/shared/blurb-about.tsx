import { chakra, Heading, Text } from "@chakra-ui/react";
import { globalBaseWidth } from "../../styles/theme";
import { ReactNode } from "react";

const Para = ({ children }: { children: ReactNode }) => {
  return (
    <Text textAlign="justify" mt={8}>
      {children}
    </Text>
  );
};

interface IBlurbProps {
  title: string;
}

const Blurb = ({ title }: IBlurbProps) => (
  <chakra.main maxW={globalBaseWidth} margin="auto" padding={8}>
    <Heading textAlign="center">{title}</Heading>
    <Para>
      This site is a technology demonstrator for Elastic Path Software. It is not a real eCommerce store, please do not try to buy anything.
    </Para>
	
	<Para>
	  This site demonstrates our Direct To Consumer Storefront backed by our SAAS Headless Commerce API. It includes integrations to Algolia and Google Shopping/Merchant Centre. This site is a work in progress and may contain bugs.
	</Para>
  </chakra.main>
);

export default Blurb;
