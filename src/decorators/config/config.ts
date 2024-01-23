import { container as defaultContainer } from "../../global/container";
import { setGlobal } from "../../global/utils/setGlobal";
import { validateContainer } from "../../global/utils/validateContainer";
import type { ConfigMetadataProperties } from "../types";
import { getMetadata } from "../utils/getMetadata";
import { getMetadataProperty } from "../utils/getMetadataProperty";
import { validateKind } from "../utils/validateKind";
import { MetadataProperties } from "./metadataProperties";

export const Config =
  (container = defaultContainer) =>
  (constructor: NewableFunction, context: ClassDecoratorContext) => {
    validateContainer(container);

    const annotationName = `@${Config.name}`;
    validateKind(annotationName, context, "class");

    const metadata = getMetadata(annotationName, context);
    const properties = <ConfigMetadataProperties>(
      getMetadataProperty(metadata, MetadataProperties.properties, [])
    );

    const { prototype } = constructor;
    for (const [property, method] of properties) {
      const value = method.call(prototype);
      if (value === undefined) {
        throw new Error(`Config property ${property.toString()} is undefined`);
      }
      setGlobal(container as Record<string, typeof value>, property, value);
    }
  };
