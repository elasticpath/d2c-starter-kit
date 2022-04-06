import React, { useState, useEffect, useMemo } from "react";
import QuantityHandler from "../components/quantityHandler/QuantityHandler";
import Link from "next/link";
import {
  Heading,
  Grid,
  GridItem,
  Button,
  NumberInput,
  NumberInputField,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  TableContainer,
  useColorModeValue,
  Divider,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useCartData } from "../context/state";
import { Promotion } from "../components/promotion/Promotion";
import Image from "next/image";
import { removeCartItem, updateCartItem } from "../services/cart";
import { createDelta } from "framer-motion/types/projection/geometry/models";

export default function Checkout() {
}
