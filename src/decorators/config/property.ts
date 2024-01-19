import { type ConfigMetadataProperties } from "../types";
import { getMetadata } from "../utils/getMetadata";
import { getMetadataProperty } from "../utils/getMetadataProperty";
import { validateKind } from "../utils/validateKind";

export const Property =
  (property: string) =>
  (method: () => unknown, context: ClassMethodDecoratorContext) => {
    const annotationName = `@${Property.name}`;
    validateKind(annotationName, context, "method");

    if (typeof property !== "string") {
      throw new Error(
        `Invalid property argument ${JSON.stringify(
          property
        )}. It must be a string`
      );
    }

    const metadata = getMetadata(annotationName, context);
    const properties = <ConfigMetadataProperties>(
      getMetadataProperty(metadata, "properties", [])
    );

    if (
      properties.find(([existingProperty]) => existingProperty === property)
    ) {
      throw new Error(`Property ${property} is being set more than once`);
    }

    properties.push([property, method]);
  };
