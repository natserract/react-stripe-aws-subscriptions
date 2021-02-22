import "source-map-support/register";
import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/apiGateway";
import { APIGatewayEvent } from "aws-lambda";
import { stripePrices } from "~/src/stripe";
import { middyfy, parse } from "@libs/lambda";
import { Stripe } from "stripe";

const viewPricesHandler: ValidatedEventAPIGatewayProxyEvent<Stripe.PriceListParams> = async (
  event: APIGatewayEvent
) => {
  const { limit } = parse<Stripe.PriceListParams>(event.queryStringParameters)

  try {
    const data = await stripePrices.listAll({ limit });
    return formatJSONResponse({ ...data });
  } catch (error) {
    return formatJSONResponse(error);
  }
};

export const main = middyfy(viewPricesHandler);
