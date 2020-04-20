import "reflect-metadata";
import { initHandlers } from "../utils/init-handlers";
import { SlsFastifyConfig, SlsFastifyController } from "../interfaces";
import { initApp, registerController } from "../utils/setup-app";

export const bootstrapApp = (config: SlsFastifyConfig, beforeStart?: () => Promise<void>) => {
  // init the base app
  let app = initApp(config);

  // Register the controllers
  for (let api of config.routes) {
    registerController(app, api);
    console.log(`loaded: ${api.name} => ${api.prefix}`);
  }

  return {
    handlers: initHandlers(config, beforeStart),
    app,
  };
};
