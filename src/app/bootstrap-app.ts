import "reflect-metadata";
import { initHandlers } from "../utils/init-handlers";
import { SlsFastifyConfig, SlsFastifyController } from "../interfaces";
import fastify = require("fastify");
import * as fp from "fastify-plugin";
import { getFromContainer } from "../utils/container";
import { initApp, registerController } from "../utils/setup-app";

export const bootstrapApp = (config: SlsFastifyConfig, beforeStart?: () => Promise<void>) => {
  if (config.isServerless) {
    return initHandlers(config, beforeStart);
  } else {
    return (async () => {
      if (beforeStart) {
        await beforeStart();
      }

      // init the base app
      let app = initApp(config);

      // Register the controllers
      for (let api of config.routes) {
        registerController(app, api);
        console.log(`loaded: ${api.name} => ${api.prefix}`);
      }

      const PORT = config.port || 3000;
      const HOST = config.host || "127.0.0.1";
      app.listen(PORT, HOST, async err => {
        if (err) console.error(err);
        console.log(`server listening on port ${PORT}`);
      });
    })();
  }
};
