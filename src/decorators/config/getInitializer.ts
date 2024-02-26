import { setGlobal } from "../../container/utils/setGlobal";
import type { Class, ConfigMetadataProperties } from "../types";
import { getMetadata } from "../utils/getMetadata";
import { getMetadataProperty } from "../utils/getMetadataProperty";
import { MetadataProperties } from "./metadataProperties";

export function getInitializer<T extends Class<object>>(
  annotationName: string,
  context: ClassDecoratorContext<T>,
  container: Record<string, T[]>,
): (this: T) => void {
  return function () {
    const config = new this();

    const metadata = getMetadata(annotationName, context);
    const properties = <ConfigMetadataProperties>(
      getMetadataProperty(metadata, MetadataProperties.properties, [])
    );

    const prototype = Object.getPrototypeOf(config);
    for (const prop of properties) {
      Object.defineProperty(prototype, prop[1].name, {
        value: undefined,
        writable: true,
      });
    }

    for (const [property, method] of properties) {
      const value = method.call(config);

      if (value === undefined) {
        throw new Error(
          `${annotationName} property ${property.toString()} is undefined`,
        );
      }

      Object.defineProperty(prototype, method.name, {
        value: () => value,
      });
      setGlobal(container as Record<string, typeof value>, property, value);
    }
  };
}
