import { RouteDefinition } from "./route-definition";
import { FastifyInstance } from "fastify";

export interface SlsFastifyConfig {
    host?: string;
    port?: number;
    routes: RouteDefinition[];
    plugins: ((fastify: FastifyInstance, opts: any, done: () => void) => void)[];
    isServerless: boolean;
  }