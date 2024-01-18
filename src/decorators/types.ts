export type ControllerMetadata = { path: string; prototype: any };
export type HttpMethodMetadata = { path: string; property: string | symbol };
export type ConfigMetadataProperties = Array<[symbol, Function]>;
export type CacheMetadata = {
  name: string;
  property: string | symbol;
  purge: boolean;
};
export type ConfigConstructor = {
  prototype: { getRouter: Function };
};
