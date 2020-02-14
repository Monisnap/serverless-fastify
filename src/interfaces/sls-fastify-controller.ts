import { FastifyInstance } from "fastify";

export interface SlsFastifyController {
  endpoints: (fastify: FastifyInstance, opts: any, done: () => void) => void;
}
