import fastify = require("fastify");
import { RouteDefinition } from "../interfaces";
import { getFromContainer, methodMetadataKey } from "..";
import { DecoratorMetadata } from "../interfaces/decorator-metadata.interface";

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
            async (request: fastify.FastifyRequest, reply: fastify.FastifyReply<any>) => {
              const result = await controller[method](request, reply);
              reply.send(result);
            }
          );
        }
      }
      done();
    },
    { prefix: api.prefix }
  );
};

export { registerController };
