import * as awsLambdaFastify from "aws-lambda-fastify";
import { SlsFastifyConfig, SlsFastifyController } from "../interfaces";
import * as fp from "fastify-plugin";
import fastify = require("fastify");
import { getFromContainer } from "..";
import { initApp, registerController } from "./setup-app";
import { Handlers } from "../interfaces/handlers.interface";

const initHandlers = (config: SlsFastifyConfig, beforeStart: (() => Promise<void>) | undefined): Handlers => {
  const handlers: Handlers = {};
  for (let api of config.routes) {
    handlers[api.name] = async (event, context) => {
      if (beforeStart) {
        await beforeStart();
      }

      // init the base app for each handler
      let app = initApp(config);
      // Register the controller
      registerController(app, api);

      return awsLambdaFastify(app)(event, context);
    };
  }

  return handlers;
};

export { initHandlers };
