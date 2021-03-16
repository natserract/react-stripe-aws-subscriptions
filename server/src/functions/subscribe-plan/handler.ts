import "source-map-support/register";
import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/apiGateway";
import { middyfy, parse } from "@libs/lambda";
import { APIGatewayEvent } from "aws-lambda";
import { stripe, createAccountingSubscription, createCustomer } from "~/src/stripe";
import { Stripe } from "stripe";

interface IRequestCustomer {
  source: string;
  email: string;
  accountingTax
}

const subscribePlanHandler: ValidatedEventAPIGatewayProxyEvent<IRequestCustomer> = async (
  event: APIGatewayEvent,
) => {
  const { source, email, accountingTax } = parse<IRequestCustomer>(event.body)

  try {
    const customer = await createCustomer({
      email,
      source,
    });

    const promises = []

    if (accountingTax) {
      const { priceId, qty, addons } = accountingTax

      const items: Stripe.SubscriptionCreateParams.Item[] = [
        {
          price: priceId,
          quantity: qty
        }
      ]

      const addInvoiceItems: Stripe.SubscriptionCreateParams.AddInvoiceItem[] = addons.map(({ priceId, qty }) => ({
        price: priceId,
        quantity: qty
      }))
      
      promises.push(createAccountingSubscription(customer, items, addInvoiceItems));
    }

    const responses = await Promise.all(promises)
    return formatJSONResponse({ responses });
  } catch (error) {
    return formatJSONResponse(error);
  }
};

export const main = middyfy(subscribePlanHandler);
