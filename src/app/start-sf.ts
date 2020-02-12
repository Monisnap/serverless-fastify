import { SFConfig } from "../models/models";
import { loadApps } from "../utils/load-apps";
import { initHandlers } from "../utils/init-handlers";

export const startSF = (sfConfig: SFConfig, beforeStart?: () => Promise<void>) => {
  const apps = loadApps(sfConfig);

  if (sfConfig.isServerless) {
    return initHandlers(apps, beforeStart ? beforeStart : undefined);
  } else {
    return (async () => {
      const instance = apps[0].instance;
      if (beforeStart) {
        await beforeStart();
      }
      const PORT = sfConfig.port || 3000;
      instance.listen(PORT, async err => {
        if (err) console.error(err);
        console.log(`server listening on port ${PORT}`);
      });
    })();
  }
};
