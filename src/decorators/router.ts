import { container as defaultContainer } from "../container/container";
import { setRouter } from "../container/utils/setRouter";
import { validateContainer } from "../container/utils/validateContainer";
import { setInjectables } from "./inject/setInjectables";
import { getMetadata } from "./utils/getMetadata";
import { validateKind } from "./utils/validateKind";

export const Router =
  (container = defaultContainer) =>
  (constructor: NewableFunction, context: ClassDecoratorContext) => {
    validateContainer(container);

    const annotationName = `@${Router.name}`;
    validateKind(annotationName, context, "class");

    context.addInitializer(function () {
      // @ts-expect-error it does not think that this is newable
      const router = new this();
      const metadata = getMetadata(annotationName, context);
      setInjectables(container, router, metadata);
      setRouter(container, router);
    });

    // @ts-expect-error NewableFunction type does not include new for some reason
    new constructor();
  };
