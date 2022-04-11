import React, { useState, useEffect, useMemo } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import QuantityHandler from "../components/quantityHandler/QuantityHandler";
import Link from "next/link";
import {
  Heading,
  Grid,
  Box,
  useColorModeValue,
  Text,
  theme,
  Flex,
} from "@chakra-ui/react";
import { useCheckoutForm, useCartData } from "../context/state";
import { config } from "../services/config";
import { Promotion } from "../components/promotion/Promotion";
import Image from "next/image";
import { checkout, payment, removeAllCartItems } from "../services/checkout";
import PersonalInfo from "../components/checkout/PersonalInfo";
import ShippingForm from "../components/checkout/ShippingForm";
import PaymentForm from "../components/checkout/PaymentForm";

const stripePromise = loadStripe(config.stripeKey);

export default function Checkout() {
  const { data } = useCheckoutForm();
  const { cartData, promotionItems, updateCartItems } = useCartData();
  const [orderData, setOrderData] = useState<any>({});

  const stripeOptions = {
    clientSecret: config.stripeClientSecret,
  };
  const [formStep, setFormStep] = useState(0);

  const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);

  const onPayOrder = async (token: string) => {
    console.log("came here", token);
    try {
      const mcart = localStorage.getItem("mcart") || "";
      const billing = data;
      const name = `${data.first_name} ${data.last_name}`;
      const customerData = { name: name, email: data.email };
      const orderRes = await checkout(mcart, customerData, billing, billing);
      console.log("orderRes", orderRes);
      const paymentParams = {
        gateway: "stripe_connect",
        method: "purchase",
        payment: "pm_card_visa",
      };
      await payment(paymentParams, orderRes.data.id);
      await removeAllCartItems(mcart);
      updateCartItems();
      setOrderData(orderRes);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box px={24} py={8}>
      <Heading>Checkout</Heading>

      <Grid templateColumns="1.7fr 1fr" columnGap="60px" mt="16px">
        <Box border={"1px solid white"}>
          <Box
            p={4}
            bg={useColorModeValue("blue.900", "blue.50")}
            color={useColorModeValue("white", "gray.900")}
          >
            <Text casing="uppercase"> personal info</Text>
          </Box>
          {formStep >= 0 && (
            <PersonalInfo formStep={formStep} nextFormStep={nextFormStep} />
          )}

          <Box
            p={4}
            bg={useColorModeValue("blue.900", "blue.50")}
            borderBottom="4px solid white"
            color={useColorModeValue("white", "gray.900")}
          >
            <Text casing="uppercase"> shipping info</Text>
          </Box>
          <Box p={4}>
            {formStep >= 1 && (
              <ShippingForm formStep={formStep} nextFormStep={nextFormStep} />
            )}
          </Box>
          {console.log(data)}

          <Box
            p={4}
            bg={useColorModeValue("blue.900", "blue.50")}
            color={useColorModeValue("white", "gray.900")}
          >
            <Text casing="uppercase"> payment info</Text>
          </Box>

          {formStep >= 2 && (
            <Elements stripe={stripePromise} options={stripeOptions}>
              <PaymentForm onPayOrder={onPayOrder} />
            </Elements>
          )}

          {formStep > 2 && <p> completed</p>}
        </Box>
      </Grid>
    </Box>
  );
}
