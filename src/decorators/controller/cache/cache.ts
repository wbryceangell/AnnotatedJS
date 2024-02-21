import { RequestHandler } from "../../../interfaces/types";
import { ClassMethodDecorator, HttpMethodMetadata } from "../../types";
import { getMetadata } from "../../utils/getMetadata";
import { getMetadataProperty } from "../../utils/getMetadataProperty";
import { validateKind } from "../../utils/validateKind";
import { MetadataProperties } from "../metadataProperties";

export const Cache = (cacheName?: string) =>
  ((handler, context) => {
    const annotationName = `@${Cache.name}`;
    validateKind(annotationName, context, "method");

    if (
      typeof cacheName !== "undefined" &&
      (typeof cacheName !== "string" || cacheName.length === 0)
    ) {
      throw new Error(
        `Invalid cache name ${JSON.stringify(cacheName)}. It must be a non-empty string`,
      );
    }

    const metadata = getMetadata(annotationName, context);
    const methods = getMetadataProperty<Array<HttpMethodMetadata>>(
      metadata,
      MetadataProperties.methods,
      [],
    );

    const methodMetadata = methods.find((value) => value.handler === handler);
    if (!methodMetadata) {
      throw new Error(
        `Cannot cache to ${cacheName} for an unconfigured controller method`,
      );
    }

    methodMetadata.cache = {
      name: cacheName,
      operation: "cache",
    };
  }) as ClassMethodDecorator<RequestHandler>;
