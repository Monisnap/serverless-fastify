import * as awsLambdaFastify from "aws-lambda-fastify";
import { Api } from "../models/models";

const initHandlers = (apps: Api[], beforeStart: (() => Promise<void>) | undefined) => {
  const handlers: ((event: any, context: any) => Promise<any>)[] = [];
  for (let app of apps) {
    if (app.name) {
      handlers[app.name] = async (event, context) => {
        if (beforeStart) {
          await beforeStart();
        }
        return awsLambdaFastify(app.instance)(event, context);
      };
    }
  }

  return handlers;
};

export { initHandlers };
