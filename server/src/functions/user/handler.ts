import "source-map-support/register";
import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/apiGateway";
import { middyfy, parse } from "@libs/lambda";
import { APIGatewayEvent } from "aws-lambda";
import { stripeAccounts } from "~/src/stripe";

const usersHandler = async (event: APIGatewayEvent) => {
    try {
        const data = stripeAccounts.listAll({
            starting_after: '',
        })
    } catch (error) {
        
    }
}

export const main = middyfy(usersHandler);