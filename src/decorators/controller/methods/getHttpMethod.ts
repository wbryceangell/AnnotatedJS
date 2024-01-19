import { type RequestHandler } from "../../../interfaces/router";
import { type HttpMethodMetadata } from "../../types";
import { validateKind } from "../../utils/validateKind";

export const getHttpMethod =
  (httpMethod: string) =>
  (path = "/") =>
  (handler: RequestHandler, context: ClassMethodDecoratorContext) => {
    validateKind(`@${httpMethod}`, context, "method");

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

    const { metadata } = context;
    if (!metadata) {
      throw new Error("HTTP Method could not use metadata");
    }
    if (!metadata.methods) {
      metadata.methods = [];
    }

    if (
      (metadata.methods as HttpMethodMetadata[]).find(
        (metadata) =>
          metadata.path === path && metadata.httpMethod === httpMethod
      )
    ) {
      throw new Error(
        `HTTP Method ${httpMethod} and path ${path} already configured`
      );
    }

    (metadata.methods as HttpMethodMetadata[]).push({
      httpMethod,
      path,
      handler,
    });
  };
