import "reflect-metadata";
import { RouteSchema, RouteShorthandOptions } from "fastify";
import { DecoratorMetadata } from "../interfaces/decorator-metadata.interface";

export const methodMetadataKey = "custom:anotations:method";

export function Get(path: string, config?: RouteShorthandOptions) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(
      methodMetadataKey,
      { method: "get", path, config } as DecoratorMetadata,
      target,
      propertyKey
    );
  };
}

export function Post(path: string, config?: RouteShorthandOptions) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(
      methodMetadataKey,
      { method: "post", path, config } as DecoratorMetadata,
      target,
      propertyKey
    );
  };
}

export function Patch(path: string, config?: RouteShorthandOptions) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(
      methodMetadataKey,
      { method: "patch", path, config } as DecoratorMetadata,
      target,
      propertyKey
    );
  };
}

export function Delete(path: string, config?: RouteShorthandOptions) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(
      methodMetadataKey,
      { method: "delete", path, config } as DecoratorMetadata,
      target,
      propertyKey
    );
  };
}
