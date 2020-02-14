import * as fastify from "fastify";
import * as fp from "fastify-plugin";
import { AppHandlerConfig } from "..";
import { SlsFastifyConfig } from "../interfaces";

const initApp = (config: SlsFastifyConfig): fastify.FastifyInstance => {
  let app: fastify.FastifyInstance = fastify({});

  // Register the plugins ( pre handler, global error, etc..)
  for (let plugin of config.plugins) {
    app.register(fp(plugin));
  }

  return app;
};

const loadApps = (config: SlsFastifyConfig): AppHandlerConfig[] => {
  const apps: AppHandlerConfig[] = [];

  if (config.isServerless) {
    // Register the apis ( controllers ) in different apps
    for (let api of config.routes) {
      const app = initApp(config);
      app.register(api.controller.endpoints.bind(this), { prefix: api.prefix });
      apps.push({
        name: api.name,
        instance: app
      } as AppHandlerConfig);
    }
  } else {
    // Register the controllers in one app ( for standalone server )
    const app = initApp(config);
    for (let api of config.routes) {
      app.register(api.controller.endpoints.bind(api.controller), { prefix: api.prefix });
      console.log(`loaded: ${api.name} => ${api.prefix}`);
    }
    apps.push({
      instance: app
    } as AppHandlerConfig);
  }

  return apps;
};

export { loadApps };
