import { Stripe } from "stripe";

const SECRET_API_KEY = process.env.STRIPE_SECRET_API_KEY;

const stripe = new Stripe(SECRET_API_KEY, {
  apiVersion: "2020-08-27",
});

export const stripeSubscribeToPlan = async (
  source: string,
  email: string,
  productPlanId: string
) => {
  const customer = await stripe.customers.create({
    email,
    source,
  });

  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [
      {
        plan: productPlanId,
      },
    ],
  });

  return subscription;
};

export const stripeViewPrices = async (
  priceListParams: Stripe.PriceListParams
) => {
  return await stripe.prices.list(priceListParams);
};

export const stripeViewProducts = async (
  productListParams: Stripe.ProductListParams
) => {
  return await stripe.products.list(productListParams);
};

export const stripDetailProduct = async (productId: string) => {
  return await stripe.products.retrieve(productId);
};
