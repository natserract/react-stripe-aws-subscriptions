import "source-map-support/register";
import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/apiGateway";
import { APIGatewayEvent } from "aws-lambda";
import { stripeViewProducts } from "~/src/stripe";
import { middyfy, parse } from "@libs/lambda";
import { Stripe } from "stripe";

const viewProductsHandler: ValidatedEventAPIGatewayProxyEvent<Stripe.ProductListParams> = async (
  event: APIGatewayEvent
) => {
  // query_string allowed: limit
  const { limit } = parse<Stripe.ProductListParams>(event.queryStringParameters)

  try {
    const data = await stripeViewProducts({ limit });
    return formatJSONResponse({ ...data });
  } catch (error) {
    return formatJSONResponse(error);
  }
};

export const main = middyfy(viewProductsHandler);
