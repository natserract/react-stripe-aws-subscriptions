import "source-map-support/register";
import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/apiGateway";
import { APIGatewayEvent } from "aws-lambda";
import { stripeViewPrices } from "~/src/stripe/price";
import { middyfy } from "@libs/lambda";
import { Stripe } from "stripe";

const viewPricesHandler: ValidatedEventAPIGatewayProxyEvent<Stripe.PriceListParams> = async (
  event: APIGatewayEvent
) => {
  const queryString = JSON.stringify(event.queryStringParameters);
  const incoming: Stripe.PriceListParams = JSON.parse(queryString);
  const { limit } = incoming;

  try {
    const data = await stripeViewPrices({ limit });
    return formatJSONResponse({ ...data });
  } catch (error) {
    return formatJSONResponse(error);
  }
};

export const main = middyfy(viewPricesHandler);
