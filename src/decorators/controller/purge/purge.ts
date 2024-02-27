import { RequestHandler } from "../../../interfaces/types";
import { ClassMethodDecorator } from "../../types";
import { validateKind } from "../../utils/validateKind";

export const Purge = () =>
  ((handler, context) => {
    const annotationName = `@${Purge.name}`;
    validateKind(annotationName, context, "method");
  }) as ClassMethodDecorator<RequestHandler>;
