import { SlsFastifyConfig } from "../src/interfaces";
import { FastifyReply, FastifyRequest } from "fastify";
import { bootstrapApp, Get } from "../src";

// Define the controller using the interface
class HelloWorldController {
  @Get("/", {
    schema: {
      response: {
        200: {
          type: "object",
          properties: {
            msg: { type: "string" },
          },
        },
      },
    },
  })
  getMessage(request: FastifyRequest, reply: FastifyReply<any>) {
    return {
      msg: "Hello world",
    };
  }
}

// Pre handler hook plugin example ( may be turned into class + decorator later )
const preHandlerHook = (fastify, options, done) => {
  fastify.addHook("preHandler", (request, reply, done) => {
    console.log("Pre handler hook !");
    done();
  });
  done();
};

// Define the config here
const config = {
  // Define the routes
  routes: [
    {
      name: "helloworld", // This is the name of the handler in serverless.yml
      controller: HelloWorldController, // the actual controller for this route
      prefix: "v1/helloworld", // The prefix defined for api gateway
    },
  ],
  // Registering the fastify plugins ( the order matters )
  plugins: [preHandlerHook],
} as SlsFastifyConfig;

const bootstrap = bootstrapApp(config, async () => {
  // Any async code before execution the handlers ( in serverless )
  // e.g initDatabaseConnection()
});

// Export the app ( to run it manually ) or register the handlers for serverless
export = {
  app: bootstrap.app,
  ...bootstrap.handlers,
};
