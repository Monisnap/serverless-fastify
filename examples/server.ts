import { initApp } from "../src";
import { slsFastifyConfig } from "./sls-fastify-config";

async function start() {
  const PORT = Number(process.env.port) || 3000;
  const HOST = process.env.host || "127.0.0.1";

  const app = initApp(slsFastifyConfig);

  app.listen(PORT, HOST, async (err) => {
    if (err) console.error(err);
    console.log(`server listening on port ${PORT}`);
  });
}

start();
