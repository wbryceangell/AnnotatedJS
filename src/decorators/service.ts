import { container as defaultContainer } from "../container/container";
import { setGlobal } from "../container/utils/setGlobal";
import { validateContainer } from "../container/utils/validateContainer";
import { setInjectables } from "./inject/setInjectables";
import { getMetadata } from "./utils/getMetadata";
import { validateKind } from "./utils/validateKind";

export const Service =
  <
    Class extends new (...args: unknown[]) => unknown = new (
      ...args: unknown[]
    ) => unknown
  >(
    container = defaultContainer
  ) =>
  (constructor: Class, context: ClassDecoratorContext<Class>) => {
    validateContainer(container);

    const annotationName = `@${Service.name}`;
    validateKind(annotationName, context, "class");

    const metadata = getMetadata(annotationName, context);
    setInjectables(container, constructor, metadata);

    setGlobal(container, constructor.name, constructor.prototype);

    context.addInitializer(function () {});

    new constructor();
  };
