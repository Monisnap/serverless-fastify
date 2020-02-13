import * as fastify from "fastify";
import * as fp from "fastify-plugin";
import { ServerlessFastifyConfig, Api } from "../models/models";

const initApp = (config: ServerlessFastifyConfig): fastify.FastifyInstance => {
  let app: fastify.FastifyInstance = fastify({});

  // Register the plugins ( pre handler, global error, etc..)
  for (let plugin of config.plugins) {
    app.register(fp(plugin));
  }

  return app;
};

const loadApps = (config: ServerlessFastifyConfig): Api[] => {
  const apps: Api[] = [];

  if (config.isServerless) {
    // Register the apis ( controllers ) in different apps
    for (let api of config.apis) {
      const app = initApp(config);
      app.register(api.controller, { prefix: api.prefix });
      apps.push({
        name: api.name,
        instance: app
      } as Api);
    }
  } else {
    // Register the controllers in one app ( for standalone server )
    const app = initApp(config);
    for (let api of config.apis) {
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
