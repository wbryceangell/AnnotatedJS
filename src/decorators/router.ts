import { container as defaultContainer } from "../container/container";
import { setRouter } from "../container/utils/setRouter";
import { validateContainer } from "../container/utils/validateContainer";
import { setInjectables } from "./inject/setInjectables";
import { AnnotatedRouter } from "./types";
import { getMetadata } from "./utils/getMetadata";
import { validateKind } from "./utils/validateKind";

export const Router =
  <
    Class extends new (...args: unknown[]) => AnnotatedRouter = new (
      ...args: unknown[]
    ) => AnnotatedRouter
  >(
    container = defaultContainer
  ) =>
  (constructor: Class, context: ClassDecoratorContext<Class>) => {
    validateContainer(container);

    const annotationName = `@${Router.name}`;
    validateKind(annotationName, context, "class");

    context.addInitializer(function () {
      const router = new this();
      const metadata = getMetadata(annotationName, context);
      setInjectables(container, router, metadata);
      setRouter(container, router);
    });

    new constructor();
  };
