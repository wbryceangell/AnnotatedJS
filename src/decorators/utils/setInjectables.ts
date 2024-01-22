import { getGlobal } from "../../global/utils/getGlobal";
import { InjectableMetadata } from "../types";
import { getMetadataProperty } from "./getMetadataProperty";

export const setInjectables = (
  container: Record<string, unknown>,
  constructor: FunctionConstructor,
  metadata: DecoratorMetadataObject
) => {
  const injectables = <Array<InjectableMetadata>>(
    getMetadataProperty(metadata, "injectables", [])
  );

  for (const { key, set } of injectables) {
    set(constructor.prototype, getGlobal(container, key));
  }
};
