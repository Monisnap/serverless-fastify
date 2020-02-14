import { FastifyInstance } from "fastify";
import { SlsFastifyController } from ".";

export interface RouteDefinition {
    name: string;
    controller: SlsFastifyController;
    prefix: string;
  }