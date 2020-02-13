import { FastifyInstance } from "fastify";

export interface Api {
  name?: string;
  instance: FastifyInstance;
}

export interface ApiDef {
  name: string;
  controller: (fastify: FastifyInstance, opts: any, done: () => void) => void;
  prefix: string;
}

export interface ServerlessFastifyConfig {
  isServerless: boolean;
  port?: number;
  apis: ApiDef[];
  plugins: ((fastify: FastifyInstance, opts: any, done: () => void) => void)[];
}
