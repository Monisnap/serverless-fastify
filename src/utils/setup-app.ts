import fastify = require("fastify");
import { SlsFastifyConfig, SlsFastifyController, RouteDefinition } from "../interfaces";
import * as fp from "fastify-plugin";
import { getFromContainer } from "..";

const initApp = (config: SlsFastifyConfig) => {
  //Create instance here
  let app: fastify.FastifyInstance = fastify({});

  // Register the plugins ( pre handler, global error, etc..)
  for (let plugin of config.plugins) {
    app.register(fp(plugin));
  }

  return app;
};

const registerController = (app: fastify.FastifyInstance, api: RouteDefinition) => {
  // Register the controller
  let controller = getFromContainer<SlsFastifyController>(api.controller);
  app.register(controller.endpoints.bind(controller), { prefix: api.prefix });
  console.log(`loaded: ${api.name} => ${api.prefix}`);
};

export { initApp, registerController };
