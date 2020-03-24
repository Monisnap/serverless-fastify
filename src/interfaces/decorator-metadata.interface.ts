import { RouteShorthandOptions } from "fastify";

export interface DecoratorMetadata {
  method: string;
  path: string;
  config?: RouteShorthandOptions;
}
