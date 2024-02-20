import { RequestHandler } from "../../../interfaces/types";
import { ClassMethodDecorator } from "../../types";
import { validateKind } from "../../utils/validateKind";

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
  }) as ClassMethodDecorator<RequestHandler>;
