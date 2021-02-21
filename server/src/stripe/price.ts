// See documentation: https://stripe.com/docs/api/prices

import { Stripe } from "stripe";

const SECRET_API_KEY = process.env.STRIPE_SECRET_API_KEY;

const stripe = new Stripe(SECRET_API_KEY, {
  apiVersion: "2020-08-27",
});

export const stripeViewPrices = async (
  priceListParams: Stripe.PriceListParams
) => {
  return await stripe.prices.list(priceListParams);
};
