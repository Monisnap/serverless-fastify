import { FastifyReply, FastifyInstance } from "fastify";
import { SlsFastifyController } from "../interfaces";

export class UserController implements SlsFastifyController {
  endpoints(fastify: FastifyInstance, opts, done) {
    fastify.get("/", async (request, reply: FastifyReply<any>) => {
      reply.send("Hello world");
    });

    done();
  }
}
