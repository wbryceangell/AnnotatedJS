import { getGlobal } from "../../container/utils/getGlobal";
import { ContainerInjectable, InjectableMetadata } from "../types";
import { getMetadataProperty } from "../utils/getMetadataProperty";
import { MetadataProperties } from "./metadataProperties";

export const setInjectables = (
  container: Record<string, unknown>,
  instance: object,
  metadata: DecoratorMetadataObject,
) => {
  const injectables = <Array<InjectableMetadata>>(
    getMetadataProperty(metadata, MetadataProperties.injectables, [])
  );

  for (const { key, set } of injectables) {
    const injectable = getGlobal(container, key) as ContainerInjectable;

    if (injectable === undefined) {
      throw new Error(`Injectable ${key} is undefined`);
    }

    let value: unknown;
    switch (injectable.type) {
      case "object": {
        value = injectable.value;
        break;
      }
      case "factory": {
        value = (<() => unknown>injectable.value)();
        break;
      }
      default: {
        throw new Error(`Invalid injectable type: ${injectable.type}`);
      }
    }

    set(instance, value);
  }
};
