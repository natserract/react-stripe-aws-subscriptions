import "source-map-support/register";
import {
  formatJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/apiGateway";
import { APIGatewayEvent } from "aws-lambda";
import { stripDetailProduct } from "~/src/stripe/product";
import { middyfy, jsonParse } from "@libs/lambda";

interface IDetailProduct {
  id: string
}

const detailProductHandler: ValidatedEventAPIGatewayProxyEvent<IDetailProduct> = async (event: APIGatewayEvent) => {
  const { id } = jsonParse<IDetailProduct>(event.pathParameters)

  try {
    const data = await stripDetailProduct(id);
    return formatJSONResponse({ ...data });
  } catch (error) {
    return formatJSONResponse(error);
  }
}

export const main = middyfy(detailProductHandler);