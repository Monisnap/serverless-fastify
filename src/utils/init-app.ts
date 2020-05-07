import fastify = require("fastify");
import { SlsFastifyConfig } from "../interfaces";
import * as fp from "fastify-plugin";
import { registerController } from "./setup-app";

const initApp = (config: SlsFastifyConfig): fastify.FastifyInstance => {
  //Create instance here
  let app: fastify.FastifyInstance = fastify({});

  // Register the plugins ( pre handler, global error, etc..)
  for (let plugin of config.plugins) {
    app.register(fp(plugin));
  }

  for (let api of config.routes) {
    // Register the controllers
    registerController(app, api);
    console.log(`loaded: ${api.name} => ${api.prefix}`);
  }

  return app;
};

export { initApp };
