import { RequestHandler } from "../../../interfaces/types";
import { ClassMethodDecorator } from "../../types";
import { validateKind } from "../../utils/validateKind";

export const Purge = (cacheName: string) =>
  ((_handler, context) => {
    const annotationName = `@${Purge.name}`;
    validateKind(annotationName, context, "method");

    if (typeof cacheName !== "string" || cacheName.length === 0) {
      throw new Error(
        `Invalid cache name ${JSON.stringify(cacheName)}. It must be a non-empty string`,
      );
    }
  }) as ClassMethodDecorator<RequestHandler>;
