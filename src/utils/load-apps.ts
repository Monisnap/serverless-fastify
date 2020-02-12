import * as fastify from "fastify";
import * as fp from "fastify-plugin";
import { SFConfig, Api } from "../models/models";

const initApp = (sfConfig: SFConfig): fastify.FastifyInstance => {
  let app: fastify.FastifyInstance = fastify({});

  // Register the plugins ( pre handler, global error, etc..)
  for (let plugin of sfConfig.plugins) {
    app.register(fp(plugin));
  }

  return app;
};

const loadApps = (sfConfig: SFConfig): Api[] => {
  const apps: Api[] = [];

  if (sfConfig.isServerless) {
    // Register the apis ( controllers ) in different apps
    for (let api of sfConfig.apis) {
      const app = initApp(sfConfig);
      app.register(api.controller, { prefix: api.prefix });
      apps.push({
        name: api.name,
        instance: app
      } as Api);
    }
  } else {
    // Register the controllers in one app ( for standalone server )
    const app = initApp(sfConfig);
    for (let api of sfConfig.apis) {
      app.register(api.controller, { prefix: api.prefix });
      console.log(`loaded: ${api.name} => ${api.prefix}`);
    }
    apps.push({
      instance: app
    } as Api);
  }

  return apps;
};

export { loadApps };
