import { type RequestHandler } from "../../../interfaces/router";
import { type HttpMethodMetadata } from "../../types";
import { getMetadata } from "../../utils/getMetadata";
import { getMetadataProperty } from "../../utils/getMetadataProperty";
import { validateKind } from "../../utils/validateKind";

export const getHttpMethod =
  (httpMethod: string) =>
  (path = "/") =>
  (handler: RequestHandler, context: ClassMethodDecoratorContext) => {
    const annotationName = `@${httpMethod}`;
    validateKind(annotationName, context, "method");

    if (typeof path !== "string") {
      throw new Error(
        `Invalid HTTP Method path argument ${JSON.stringify(
          path
        )}. Argument must be a string`
      );
    }

    if (path.length === 0) {
      throw new Error("HTTP Method path argument is an empty string");
    }

    const metadata = getMetadata(annotationName, context);
    const methods = <Array<HttpMethodMetadata>>(
      getMetadataProperty(metadata, "methods", [])
    );

    if (
      methods.find(
        (metadata) =>
          metadata.path === path && metadata.httpMethod === httpMethod
      )
    ) {
      throw new Error(
        `HTTP Method ${httpMethod} and path ${path} already configured`
      );
    }

    methods.push({
      httpMethod,
      path,
      handler,
    });
  };
