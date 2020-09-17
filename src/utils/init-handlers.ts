import * as awsLambdaFastify from "aws-lambda-fastify";
import { SlsFastifyConfig, SlsFastifyController } from "../interfaces";
import fastify = require("fastify");
import * as fp from "fastify-plugin";
import { registerController } from "./setup-app";
import { Handlers } from "../interfaces/handlers.interface";

const initHandlers = (config: SlsFastifyConfig, beforeHandlingRequest: ((event?, context?) => Promise<void | string>) | undefined): Handlers => {
  const handlers: Handlers = {};
  for (let api of config.routes) {
    handlers[api.name] = async (event, context) => {

      if (beforeHandlingRequest) {
        await beforeHandlingRequest(event, context);
      }

      //Create instance here
      let app: fastify.FastifyInstance = fastify({});

      // Register the plugins ( pre handler, global error, etc..)
      for (let plugin of config.plugins) {
        app.register(fp(plugin));
      }
      // Register the controller
      registerController(app, api);

      return awsLambdaFastify(app)(event, context);
    };
  }

  return handlers;
};

export { initHandlers };
