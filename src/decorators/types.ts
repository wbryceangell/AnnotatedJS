import { type RequestHandler, type Router } from "../interfaces/router";

export type ControllerMetadata = {
  path: string;
  methodMetadata: HttpMethodMetadata[];
};
export type HttpMethodMetadata = {
  path: string;
  httpMethod: string;
  handler: RequestHandler;
};
export type ConfigMetadataProperties = Array<[string, () => unknown]>;
export type ConfigConstructor = {
  prototype: { getRouter: () => Router };
};
export type InjectableMetadata = {
  key: string;
  set(object: unknown, value: unknown): void;
};
