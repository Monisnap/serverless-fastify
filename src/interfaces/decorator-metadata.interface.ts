import { RouteSchema } from "fastify";

export interface DecoratorMetadata {
  method: string;
  path: string;
  config: RouteSchema;
}
