import "source-map-support/register";
import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { APIGatewayEvent } from "aws-lambda";
import { stripeSubscribeToPlan } from "~/src/stripe/subscribeToPlan";

interface IRequestCustomer {
  source: string;
  email: string;
  productPlanId: string;
  name?: string;
  type?: string;
  description?: string;
  images?: Array<string>
}

const subscribePlanHandler: ValidatedEventAPIGatewayProxyEvent<IRequestCustomer> = async (
  event: APIGatewayEvent,
) => {
  const eventBody = JSON.stringify(event.body);
  const incoming: IRequestCustomer = JSON.parse(eventBody);
  const { source, email, productPlanId } = incoming;

  try {
    const data = await stripeSubscribeToPlan(source, email, productPlanId);
    return formatJSONResponse({ ...data });
  } catch (error) {
    return formatJSONResponse(error);
  }
};

export const main = middyfy(subscribePlanHandler);
