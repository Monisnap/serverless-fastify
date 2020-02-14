import { initHandlers } from "../utils/init-handlers";
import { SlsFastifyConfig, AppHandlerConfig } from "../interfaces";
import { loadApps } from "../utils/init-app";

export const bootstrapApp = (config: SlsFastifyConfig, beforeStart?: () => Promise<void>) => {
  const apps = loadApps(config);

  if (config.isServerless) {
    return initHandlers(apps, beforeStart);
  } else {
    return (async () => {
      const instance = apps[0].instance;
      if (beforeStart) {
        await beforeStart();
      }
      const PORT = config.port || 3000;
      const HOST = config.host || "127.0.0.1";
      instance.listen(PORT, HOST, async err => {
        if (err) console.error(err);
        console.log(`server listening on port ${PORT}`);
      });
    })();
  }
};
