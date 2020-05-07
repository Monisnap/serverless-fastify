import { RouteDefinition } from "./route-definition";
import { FastifyInstance } from "fastify";

export interface SlsFastifyConfig {
  routes: RouteDefinition[];
  plugins: ((fastify: FastifyInstance, opts: any, done: () => void) => void)[];
}
