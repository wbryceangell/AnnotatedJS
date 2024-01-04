export type ControllerMetadata = { path: string; prototype: any };
export type HttpMethodMetadata = { path: string; property: string | symbol };
export type PropertyMetadata = {
  property: symbol;
  methodName: string | symbol;
};
export type CacheMetadata = {
  name: string;
  property: string | symbol;
  purge: boolean;
};
export type ConfigConstructor = {
  prototype: { getRouter: Function };
};
