import { RequestHandler } from "../../../interfaces/types";
import type { ClassMethodDecorator, HttpMethodMetadata } from "../../types";
import { getMetadata } from "../../utils/getMetadata";
import { getMetadataProperty } from "../../utils/getMetadataProperty";
import { setMetadataProperty } from "../../utils/setMetadataProperty";
import { validateKind } from "../../utils/validateKind";
import { MetadataProperties } from "../metadataProperties";

export const getHttpMethod =
  (httpMethod: string) =>
  (path = "/") =>
    ((handler, context) => {
      const annotationName = `@${httpMethod}`;
      validateKind(annotationName, context, "method");

      if (typeof path !== "string") {
        throw new Error(
          `Invalid HTTP Method path argument ${JSON.stringify(
            path,
          )}. Argument must be a string`,
        );
      }

      if (path.length === 0) {
        throw new Error("HTTP Method path argument is an empty string");
      }

      const metadata = getMetadata(annotationName, context);
      const methods = <Array<HttpMethodMetadata>>(
        getMetadataProperty(metadata, MetadataProperties.methods, [])
      );

      if (
        methods.find(
          (metadata) =>
            metadata.path === path && metadata.httpMethod === httpMethod,
        )
      ) {
        throw new Error(
          `HTTP Method ${httpMethod} and path ${path} already configured`,
        );
      }

      methods.push({
        methodName: context.name,
        httpMethod,
        path,
        getHandler: (_container: Record<string, unknown>, controller: object) =>
          handler.bind(controller),
      });

      setMetadataProperty(metadata, MetadataProperties.methods, methods);
    }) as ClassMethodDecorator<RequestHandler>;
