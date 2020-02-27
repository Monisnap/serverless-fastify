import { SlsFastifyConfig, SlsFastifyController } from "../src/interfaces";
import { bootstrapApp } from "../src/app/bootstrap-app";
import { FastifyInstance, FastifyReply } from "fastify";

// Define the controller using the interface
class UserController implements SlsFastifyController {
  endpoints(fastify: FastifyInstance, opts, done) {
    fastify.get("/", async (request, reply: FastifyReply<any>) => {
      reply.send("Hello world");
    });

    done();
  }
}

// Pre handler hook plugin example
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
      name: "users", // This is the name of the handler in serverless.yml
      controller: UserController, // the actual controller for this route
      prefix: "v1/users" // The prefix defined for api gateway
    }
  ],
  // Registering the fastify plugins ( the order matters )
  plugins: [preHandlerHook]
} as SlsFastifyConfig;

// Run the app ( local dev ) or register the handlers for serverless
bootstrapApp(config, async () => {
  // Any async actions before launching app
  // e.g initDatabaseConnection()
});
