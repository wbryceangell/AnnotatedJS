import { RequestHandler } from "../../../interfaces/types";
import { ClassMethodDecorator } from "../../types";
import { validateKind } from "../../utils/validateKind";

export const Cache = (cacheName?: string) =>
  ((method, context) => {
    const annotationName = `@${Cache.name}`;
    validateKind(annotationName, context, "method");

    if (typeof cacheName !== "undefined" && typeof cacheName !== "string") {
      throw new Error(
        `Invalid cache name ${JSON.stringify(cacheName)}. It must be a string`,
      );
    }
  }) as ClassMethodDecorator<RequestHandler>;
