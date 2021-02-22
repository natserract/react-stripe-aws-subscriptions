import middy from "@middy/core"
import middyJsonBodyParser from "@middy/http-json-body-parser"
import { APIGatewayProxyEventPathParameters } from "aws-lambda";

export const middyfy = (handler) => {
  return middy(handler).use(middyJsonBodyParser())
}

export function parse<T>(event: APIGatewayProxyEventPathParameters | string): T {
  const stringify = JSON.stringify(event);
  const incoming: T = JSON.parse(stringify);

  return incoming || null
}