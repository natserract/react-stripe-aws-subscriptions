import { Stripe } from "stripe";

export { stripePaginate } from './paginate'

const SECRET_API_KEY = process.env.STRIPE_SECRET_API_KEY;

const stripe = new Stripe(SECRET_API_KEY, {
  apiVersion: "2020-08-27",
  maxNetworkRetries: 2
});

export const stripeCustomers = {
  create: async (source: string, email: string) => {
    const customer = await stripe.customers.create({
      email,
      source,
    });

    return customer
  },
  delete: async (customerId: string) => {
    return await stripe.customers.del(customerId)
  }
}

export const stripeSubscription = {
  subscribe: async (source: string, email: string, productPlanId: string) => {
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
  },
};

export const stripePrices = {
  listAll: async (priceListParams: Stripe.PriceListParams) => {
    return await stripe.prices.list(priceListParams);
  },
};

export const stripeProduct = {
  listAll: async (productListParams?: Stripe.ProductListParams) => {
    return await stripe.products.list(productListParams);
  },
  retrieve: async (productId: string) => {
    return await stripe.products.retrieve(productId);
  },
};

export const stripeAccounts = {
  listAll: async (accountListParams?: Stripe.AccountListParams) => {
    return await stripe.accounts.list(accountListParams)
  }
}