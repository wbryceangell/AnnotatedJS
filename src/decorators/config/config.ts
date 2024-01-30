import { container as defaultContainer } from "../../container/container";
import { setGlobal } from "../../container/utils/setGlobal";
import { validateContainer } from "../../container/utils/validateContainer";
import type { Class, ClassDecorator, ConfigMetadataProperties } from "../types";
import { getMetadata } from "../utils/getMetadata";
import { getMetadataProperty } from "../utils/getMetadataProperty";
import { validateKind } from "../utils/validateKind";
import { MetadataProperties } from "./metadataProperties";

export const Config = <T extends Class<object>>(container = defaultContainer) =>
  ((constructor, context) => {
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

    new constructor();
  }) as ClassDecorator<T>;
