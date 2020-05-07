import { initHandlers } from "../src";
import { slsFastifyConfig } from "./sls-fastify-config"; // Your config

// Register the handlers for serverless
export = {
  ...initHandlers(slsFastifyConfig, async () => {
    // Any async code before execution the handlers ( in serverless )
    // e.g initDatabaseConnection()
  }),
};
