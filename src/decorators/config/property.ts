import { Config } from "../../interfaces/config";

export const Property = (key: Symbol) =>
  ((config, methodName) => {
    Reflect.defineMetadata(key, methodName, config);
  }) as (
    target: Config,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<() => any>
  ) => TypedPropertyDescriptor<() => any> | void;
