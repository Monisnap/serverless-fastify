# Serverless Fastify

Simple wrapper around [Fastify](https://www.fastify.io/) to use it with [Serverless](https://serverless.com/)

Disclaimer: very EARLY draft of the package

## Install

Install with npm:

```
npm i serverless-fastify --save
```

## Example

app.ts

```ts
import { SlsFastifyConfig, SlsFastifyController } from "serverless-fastify";
import { bootstrapApp } from "serverless-fastify";
import { FastifyInstance, FastifyReply } from "fastify";

// Define the controller using the interface
class UserController implements SlsFastifyController {
  endpoints(fastify: FastifyInstance, opts, done) {
    fastify.get("/", async (request, reply: FastifyReply<any>) => {
      reply.send("Hello world");
    });

    done();
  }
}

// Pre handler hook plugin example
const preHandlerHook = (fastify, options, done) => {
  fastify.addHook("preHandler", (request, reply, done) => {
    console.log("Pre handler hook !");
    done();
  });
  done();
};

// Define the config here
const config = {
  host: "localhost",
  port: 3000,
  // Env variable which define if it's running in serverless env
  // Just set it to true in the serveless.yml file
  isServerless: process.env.IS_SERVERLESS || false,
  // Define the routes
  routes: [
    {
      name: "users", // This is the name of the handler in serverless.yml
      controller: UserController, // the actual controller for this route
      prefix: "v1/users" // The prefix defined for api gateway
    }
  ],
  // Registering the fastify plugins ( the order matters )
  plugins: [preHandlerHook]
} as SlsFastifyConfig;

// Run the app ( local dev ) or register the handlers for serverless
bootstrapApp(config, async () => {
  // Any async actions before launching app
  // e.g initDatabaseConnection()
});

```

serverless.yml

```yml
service: sls-fastify

provider:
  name: aws
  runtime: nodejs12.x
  stage: ${opt:stage, 'dev'}
  region: eu-west-1
  stackName: ${self:service}-${self:provider.stage}
  apiName: ${self:service}-${self:provider.stage}
  timeout: 29
  environment:
    IS_SERVERLESS: true

functions:
  users:
    handler: src/app.users
    events:
      - http: "ANY /v1/users"
      - http: "ANY /v1/users/{proxy+}"
```

## License

Licensed under MIT
