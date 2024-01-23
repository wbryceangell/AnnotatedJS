import { container as defaultContainer } from "../global/container";
import { setGlobal } from "../global/utils/setGlobal";
import { validateContainer } from "../global/utils/validateContainer";
import { routerKey } from "../keys";
import type { Router as RouterType } from "./types";
import { validateKind } from "./utils/validateKind";

export const Router =
  (container = defaultContainer) =>
  (
    constructor: NewableFunction & RouterType,
    context: ClassDecoratorContext
  ) => {
    validateContainer(container);

    const annotationName = `@${Router.name}`;
    validateKind(annotationName, context, "class");

    setGlobal(container, routerKey, constructor.prototype);
  };
