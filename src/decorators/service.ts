import { container as defaultContainer } from "../global/container";
import { setGlobal } from "../global/utils/setGlobal";
import { validateContainer } from "../global/utils/validateContainer";
import { getMetadata } from "./utils/getMetadata";
import { setInjectables } from "./utils/setInjectables";
import { validateKind } from "./utils/validateKind";

export const Service =
  (container = defaultContainer) =>
  (constructor: FunctionConstructor, context: ClassDecoratorContext) => {
    validateContainer(container);

    const annotationName = `@${Service.name}`;
    validateKind(annotationName, context, "class");

    const metadata = getMetadata(annotationName, context);
    setInjectables(container, constructor, metadata);

    setGlobal(container, constructor.name, constructor.prototype);
  };
