import * as Yup from "yup";

const personalInformationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
});

const billingAddressSchema = Yup.object({
  first_name: Yup.string()
    .min(2)
    .required("You need to provided a first name."),
  last_name: Yup.string().min(2).required("You need to provided a last name."),
  company_name: Yup.string().min(1).optional(),
  line_1: Yup.string().min(1).required("You need to provided an address."),
  line_2: Yup.string().min(1).optional(),
  city: Yup.string().min(1).optional(),
  county: Yup.string().min(1).optional(),
  region: Yup.string().min(1).required("You need to provided a region."),
  postcode: Yup.string().min(1).required("You need to provided a postcode."),
  country: Yup.string().min(1).required("You need to provided a country."),
});

const shippingAddressSchema = Yup.object({
  phone_number: Yup.string()
    .matches(
      /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
      "Phone number is not valid"
    )
    .optional(),
  instructions: Yup.string().min(1).optional(),
}).concat(billingAddressSchema);

type SupportedGateways = "braintree"; // TODO add more gateways

const paymentSchema = Yup.object({
  method: Yup.mixed<"purchase">()
    .oneOf(["purchase"])
    .required("Missing payment method"),
  gateway: Yup.mixed<SupportedGateways>()
    .oneOf(["braintree"])
    .required("Missing payment gateway"),
  payment: Yup.string().required("Missing payment nonce or token"),
  options: Yup.object({
    customer: Yup.string().optional(),
    idempotency_key: Yup.string().optional(),
    receipt_email: Yup.string().optional(),
  }).optional(),
});

export const checkoutFormSchema = Yup.object().shape({
  personal: personalInformationSchema,
  shippingAddress: shippingAddressSchema,
  sameAsShipping: Yup.boolean().default(true),
  billingAddress: billingAddressSchema.notRequired().default(undefined),
  payment: paymentSchema.required(),
});

export type CheckoutForm = Yup.InferType<typeof checkoutFormSchema>;
