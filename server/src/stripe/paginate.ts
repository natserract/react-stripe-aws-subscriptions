import { Stripe } from "stripe";
import { APIGatewayEvent } from "aws-lambda";
import { parse } from "@libs/lambda";

export const stripePaginate = async (
  data: Stripe.Response<Stripe.ApiList<any>>,
  event: APIGatewayEvent,
  stripeType: any
) => {};
