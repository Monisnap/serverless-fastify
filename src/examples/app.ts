import { SlsFastifyConfig } from "..";
import { UserController } from "./user.controller";
import { bootstrapApp } from "../app/bootstrap-app";

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
      controller: new UserController(),
      prefix: "v1/users"
    }
  ],
  plugins: [preHandlerHook]
} as SlsFastifyConfig;

bootstrapApp(config, async () => {
  // Any async actions before launching app
  // e.g initDatabaseConnection()
});
