// See documentation: https://stripe.com/docs/api/products/

import { Stripe } from "stripe";

const SECRET_API_KEY = process.env.STRIPE_SECRET_API_KEY;

const stripe = new Stripe(SECRET_API_KEY, {
  apiVersion: "2020-08-27",
});

export const stripeViewProducts = async (productListParams: Stripe.ProductListParams) => {
  return await stripe.products.list(productListParams);
};

export const stripDetailProduct = async (productId: string) => {
  return await stripe.products.retrieve(productId)
}