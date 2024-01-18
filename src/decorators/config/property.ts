import { ConfigMetadataProperties } from "../types";

export const Property =
  (property: symbol) =>
  (method: Function, { kind, metadata }: ClassMethodDecoratorContext) => {
    if (kind !== "method")
      throw new Error("Property can only be used on a method");
    if (typeof property !== "symbol")
      throw new Error(
        `Invalid property argument ${JSON.stringify(
          property
        )}. It must be a symbol`
      );
    if (!metadata) throw new Error("Property could not use metadata");
    if (!metadata.properties) metadata.properties = [];
    (<ConfigMetadataProperties>metadata.properties).push([property, method]);
  };
