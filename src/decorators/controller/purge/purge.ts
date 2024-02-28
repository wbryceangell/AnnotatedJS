import { RequestHandler } from "../../../interfaces/types";
import { ClassMethodDecorator, HttpMethodMetadata } from "../../types";
import { getMetadata } from "../../utils/getMetadata";
import { getMetadataProperty } from "../../utils/getMetadataProperty";
import { validateKind } from "../../utils/validateKind";
import { MetadataProperties } from "../metadataProperties";

export const Purge = (cacheName: string) =>
  ((_handler, context) => {
    const annotationName = `@${Purge.name}`;
    validateKind(annotationName, context, "method");

    if (typeof cacheName !== "string" || cacheName.length === 0) {
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

    const methodMetadata = methods.find(
      (value) => value.methodName === context.name,
    );

    if (!methodMetadata) {
      throw new Error(
        `Cannot purge ${cacheName} for an unconfigured controller method`,
      );
    }
  }) as ClassMethodDecorator<RequestHandler>;
