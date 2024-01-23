import { container as defaultContainer } from "../global/container";
import { setRouter } from "../global/utils/setRouter";
import { validateContainer } from "../global/utils/validateContainer";
import type { RouterConstructor } from "./types";
import { validateKind } from "./utils/validateKind";

export const Router =
  (container = defaultContainer) =>
  (constructor: RouterConstructor, context: ClassDecoratorContext) => {
    validateContainer(container);

    const annotationName = `@${Router.name}`;
    validateKind(annotationName, context, "class");

    setRouter(container, constructor.prototype);
  };
