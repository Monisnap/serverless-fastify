import { SlsFastifyConfig } from "../src/interfaces";
import { HelloWorldController } from "./hello-world.controller";

// Pre handler hook plugin example ( may be turned into class + decorator later )
const preHandlerHook = (fastify, options, done) => {
  fastify.addHook("preHandler", (request, reply, done) => {
    console.log("Pre handler hook !");
    done();
  });
  done();
};

// Define the config here
const slsFastifyConfig = {
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

export { slsFastifyConfig };
