import { Flex, chakra } from "@chakra-ui/react";
import Image from "next/image";

const Footer = (): JSX.Element => {
  return (
    <Flex
      py={4}
      borderTop="1px solid #eaeaea"
      justifyContent="center"
      alignItems="center"
    >
      <chakra.a
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{" "}
        <Image src="/icons/ep-logo.svg" alt="ep Logo" width={72} height={16} />
      </chakra.a>
    </Flex>
  );
};

export default Footer;
