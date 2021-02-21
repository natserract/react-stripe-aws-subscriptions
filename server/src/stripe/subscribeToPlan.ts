import { Stripe } from "stripe";

const SECRET_API_KEY = process.env.STRIPE_SECRET_API_KEY

const stripe = new Stripe(SECRET_API_KEY, {
    apiVersion: '2020-08-27'
});

export const stripeSubscribeToPlan = async (
  source: string,
  email: string,
  productPlanId: string
) => {
  const customer = await stripe.customers.create({
      email,
      source,
  })

  const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{
        plan: productPlanId,
      }],
  })

  return subscription
};
