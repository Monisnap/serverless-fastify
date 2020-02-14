import { SlsFastifyConfig, SlsFastifyController } from "../src/interfaces";
import { bootstrapApp } from "../src/app/bootstrap-app";
import { FastifyInstance, FastifyReply } from "fastify";

// Define controller using the interface
class UsersController implements SlsFastifyController {
  endpoints(fastify: FastifyInstance, opts, done) {
    fastify.get("/", async (request, reply: FastifyReply<any>) => {
      reply.send("Hello world");
    });

    done();
  }
}

const preHandlerHook = (fastify, options, done) => {
  fastify.addHook("preHandler", (request, reply, done) => {
    console.log("Pre handler hook !");
    done();
  });
  done();
};

const config = {
  host: "localhost",
  port: 3000,
  isServerless: false,
  routes: [
    {
      name: "users",
      controller: new UsersController(),
      prefix: "v1/users"
    }
  ],
  plugins: [preHandlerHook]
} as SlsFastifyConfig;

bootstrapApp(config, async () => {
  // Any async actions before launching app
  // e.g initDatabaseConnection()
});
