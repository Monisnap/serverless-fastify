import { Get } from "../src";
import { FastifyRequest, FastifyReply } from "fastify";

// Define the controller using the interface
export class HelloWorldController {
  @Get("/", {
    schema: {
      response: {
        200: {
          type: "object",
          properties: {
            msg: { type: "string" },
          },
        },
      },
    },
  })
  getMessage(request: FastifyRequest, reply: FastifyReply<any>) {
    return {
      msg: "Hello world",
    };
  }
}
