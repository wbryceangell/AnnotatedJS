import { getGlobal } from "../../container/utils/getGlobal";
import { InjectableMetadata } from "../types";
import { getMetadataProperty } from "../utils/getMetadataProperty";
import { MetadataProperties } from "./metadataProperties";

export const setInjectables = (
  container: Record<string, unknown>,
  constructor: object,
  metadata: DecoratorMetadataObject
) => {
  const injectables = <Array<InjectableMetadata>>(
    getMetadataProperty(metadata, MetadataProperties.injectables, [])
  );

  for (const { key, set } of injectables) {
    const value = getGlobal(container, key);

    if (value === undefined) {
      throw new Error(`Injectable ${key} is undefined`);
    }

    set(constructor, value);
  }
};
