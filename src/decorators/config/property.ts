import { propertiesKey } from "../../keys";
import getProperties from "./getProperties";

export const Property = (property: symbol) =>
  ((config, methodName) => {
    if (typeof property !== "symbol")
      throw new Error(
        `Invalid property argument ${JSON.stringify(
          property
        )}. It must be a symbol`
      );
    const properties = getProperties(config);
    properties.push({ property, methodName });
    Reflect.defineMetadata(propertiesKey, properties, config);
  }) as (
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<() => any>
  ) => TypedPropertyDescriptor<() => any> | void;
