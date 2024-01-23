export type Router = {
  get: RouteBuilder;
  put: RouteBuilder;
  post: RouteBuilder;
  patch: RouteBuilder;
  delete: RouteBuilder;
  all: RouteBuilder;
  handle: RequestHandler;
};
export type RequestHandler = (req: Request) => Promise<Response>;
export type RouteBuilder = (uri: string, handler: RequestHandler) => Router;
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
