import { keys } from "../../container/keys";
import { ClassMethodDecorator, type ConfigMetadataProperties } from "../types";
import { getMetadata } from "../utils/getMetadata";
import { getMetadataProperty } from "../utils/getMetadataProperty";
import { setMetadataProperty } from "../utils/setMetadataProperty";
import { validateKind } from "../utils/validateKind";
import { MetadataProperties } from "./metadataProperties";

/**
 * A class method decorator that specifies an injectable property
 *
 * @see {@link Config} for example
 *
 * @typeParam T - Return type of the annotated method
 *
 * @param property - A unique string used to represent the property
 *
 */
export const Property = <T>(property: string) =>
  ((method, context) => {
    const annotationName = `@${Property.name}`;
    validateKind(annotationName, context, "method");

    if (typeof property !== "string") {
      throw new Error(
        `Invalid property argument ${JSON.stringify(
          property,
        )}. It must be a string`,
      );
    }

    if (Object.values(keys).includes(property)) {
      throw new Error(`Property ${property} is a reserved key`);
    }

    const metadata = getMetadata(annotationName, context);
    const properties = <ConfigMetadataProperties>(
      getMetadataProperty(metadata, MetadataProperties.properties, [])
    );

    if (
      properties.find(([existingProperty]) => existingProperty === property)
    ) {
      throw new Error(`Property ${property} is being set more than once`);
    }

    properties.push([property, method]);
    setMetadataProperty(metadata, MetadataProperties.properties, properties);
  }) as ClassMethodDecorator<T>;
