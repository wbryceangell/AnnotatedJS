import { RequestHandler } from "../../interfaces/types";
import { ClassMethodDecorator } from "../types";
import { validateKind } from "../utils/validateKind";

export const Cache = () =>
  ((method, context) => {
    const annotationName = `@${Cache.name}`;
    validateKind(annotationName, context, "method");
  }) as ClassMethodDecorator<RequestHandler>;
