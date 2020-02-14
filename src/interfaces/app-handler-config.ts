import { FastifyInstance } from "fastify";

export interface AppHandlerConfig {
    name?: string;
    instance: FastifyInstance;
  }
  