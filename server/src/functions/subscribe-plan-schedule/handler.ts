import "source-map-support/register";
import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/apiGateway";
import { middyfy, parse } from "@libs/lambda";
import { APIGatewayEvent } from "aws-lambda";
import {
  stripe,
  createCustomer,
  createAccountingSubscriptionScheduled,
} from "~/src/stripe";

interface IRequestSubscribePlan {
  source: string;
  email: string;
  serviceConfig: any;
}

const subscribeSchedulePlanHandler: ValidatedEventAPIGatewayProxyEvent<IRequestSubscribePlan> = async (
  event: APIGatewayEvent
) => {
  const { source, email, serviceConfig } = parse<IRequestSubscribePlan>(
    event.body
  );

  try {
    const customer = await createCustomer({
      email,
      source,
    });

    const serviceItems = Object.entries(serviceConfig)
      .map(([key, val]: [string, any]) => {
        return val ? { type: key, ...val } : null;
      })
      .filter((v) => !!v);

    const data = await createAccountingSubscriptionScheduled(
      customer,
      serviceItems
    );
    return formatJSONResponse({ ...data });
  } catch (error) {
    return formatJSONResponse({ error: error.message });
  }
};

export const main = middyfy(subscribeSchedulePlanHandler);
