import "reflect-metadata";
import { RouteSchema, RouteShorthandOptions } from "fastify";
import { DecoratorMetadata } from "../interfaces/decorator-metadata.interface";

export const methodMetadataKey = "custom:anotations:http-method";

const generateDecoratorFunction = ({ method, path, config }: DecoratorMetadata) => {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(
      methodMetadataKey,
      {
        method,
        path,
        config
      } as DecoratorMetadata,
      target,
      propertyKey
    );
    const func = descriptor.value;
    // Transform the function as async to handle only async functions in the package
    descriptor.value = async function(...args: any[]) {
      return await func.apply(this, args);
    };
  };
};

export function Get(path: string, config?: RouteShorthandOptions) {
  return generateDecoratorFunction({ method: "get", path, config });
}

export function Post(path: string, config?: RouteShorthandOptions) {
  return generateDecoratorFunction({ method: "post", path, config });
}

export function Patch(path: string, config?: RouteShorthandOptions) {
  return generateDecoratorFunction({ method: "patch", path, config });
}

export function Delete(path: string, config?: RouteShorthandOptions) {
  return generateDecoratorFunction({ method: "delete", path, config });
}
