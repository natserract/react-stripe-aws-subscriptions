import "source-map-support/register";
import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/apiGateway";
import { APIGatewayEvent } from "aws-lambda";
import { stripeViewProducts } from "~/src/stripe/product";
import { middyfy, jsonParse } from "@libs/lambda";
import { Stripe } from "stripe";

const viewProductsHandler: ValidatedEventAPIGatewayProxyEvent<Stripe.ProductListParams> = async (
  event: APIGatewayEvent
) => {
  // query_string allowed: limit
  const { limit } = jsonParse<Stripe.ProductListParams>(event.queryStringParameters)

  try {
    const data = await stripeViewProducts({ limit });
    return formatJSONResponse({ ...data });
  } catch (error) {
    return formatJSONResponse(error);
  }
};

export const main = middyfy(viewProductsHandler);
