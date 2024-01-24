import { container as defaultContainer } from "../container/container";
import { setRouter } from "../container/utils/setRouter";
import { validateContainer } from "../container/utils/validateContainer";
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
