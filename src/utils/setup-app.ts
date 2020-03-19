import fastify = require("fastify");
import { SlsFastifyConfig, SlsFastifyController, RouteDefinition } from "../interfaces";
import * as fp from "fastify-plugin";
import { getFromContainer, methodMetadataKey } from "..";
import { DecoratorMetadata } from "../interfaces/decorator-metadata.interface";

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
  let controller = getFromContainer(api.controller) as any;

  app.register(
    (fastify: fastify.FastifyInstance, opts, done) => {
      for (let method in controller) {
        // Get the decorator data from the key
        let decoratorData = Reflect.getMetadata(methodMetadataKey, controller, method) as DecoratorMetadata;
        // If the decorator is not null, it means the method has been decorated
        if (decoratorData) {
          // Set up the route and handler with the decorator data
          fastify[decoratorData.method](
            decoratorData.path,
            decoratorData.config ?? {},
            (request: fastify.FastifyRequest, reply: fastify.FastifyReply<any>) => {
              reply.send(controller[method](request, reply))
            }
          );
        }
      }
      done();
    },
    { prefix: api.prefix }
  );
};

export { initApp, registerController };
