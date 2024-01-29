import { container as defaultContainer } from "../container/container";
import { setGlobal } from "../container/utils/setGlobal";
import { validateContainer } from "../container/utils/validateContainer";
import { setInjectables } from "./inject/setInjectables";
import { getMetadata } from "./utils/getMetadata";
import { validateKind } from "./utils/validateKind";

export const Service =
  <
    Class extends new (...args: unknown[]) => object = new (
      ...args: unknown[]
    ) => object
  >(
    container = defaultContainer
  ) =>
  (constructor: Class, context: ClassDecoratorContext<Class>) => {
    validateContainer(container);

    const annotationName = `@${Service.name}`;
    validateKind(annotationName, context, "class");

    if (typeof context.name !== "string") {
      throw new Error(`${annotationName} must be used on a named class`);
    }

    context.addInitializer(function () {
      const service = new this();

      const metadata = getMetadata(annotationName, context);
      setInjectables(container, service, metadata);

      // @ts-expect-error we need to use object type but it is actually a class
      setGlobal(container, context.name, service);
    });

    new constructor();
  };
