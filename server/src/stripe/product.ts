// See documentation: https://stripe.com/docs/api/products/

import { Stripe } from "stripe";

const SECRET_API_KEY = process.env.STRIPE_SECRET_API_KEY;

const stripe = new Stripe(SECRET_API_KEY, {
  apiVersion: "2020-08-27",
});

export const stripeViewProducts = async (productLists: Stripe.ProductListParams) => {
  return await stripe.products.list(productLists);
};