import { SlsFastifyConfig } from "../src/interfaces";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { bootstrapApp, Get } from "../src";

// Define the controller using the interface
class HelloWorldController {
  @Get("/", {
    schema: {
      response: {
        200: {
          type: "object",
          properties: {
            msg: { type: "string" }
          }
        }
      }
    }
  })
  getMessage(request: FastifyRequest, reply: FastifyReply<any>) {
    return {
      msg: "Hello world"
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
  host: "localhost",
  port: 3000,
  // Env variable which define if it's running in serverless env
  // Just set it to true in the serveless.yml file
  isServerless: process.env.IS_SERVERLESS || false,
  // Define the routes
  routes: [
    {
      name: "helloworld", // This is the name of the handler in serverless.yml
      controller: HelloWorldController, // the actual controller for this route
      prefix: "v1/helloworld" // The prefix defined for api gateway
    }
  ],
  // Registering the fastify plugins ( the order matters )
  plugins: [preHandlerHook]
} as SlsFastifyConfig;

// Run the app ( local dev ) or register the handlers for serverless
bootstrapApp(config, async () => {
  // Any async code before launching app
  // e.g initDatabaseConnection()
});
