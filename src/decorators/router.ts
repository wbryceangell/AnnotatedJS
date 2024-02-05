import { container as defaultContainer } from "../container/container";
import { keys } from "../container/keys";
import { setGlobal } from "../container/utils/setGlobal";
import { validateContainer } from "../container/utils/validateContainer";
import { setInjectables } from "./inject/setInjectables";
import { AnnotatedRouter, Class, ClassDecorator } from "./types";
import { getMetadata } from "./utils/getMetadata";
import { validateKind } from "./utils/validateKind";

export const Router = <T extends Class<AnnotatedRouter>>(
  container = defaultContainer
) =>
  ((constructor, context) => {
    validateContainer(container);

    const annotationName = `@${Router.name}`;
    validateKind(annotationName, context, "class");

    context.addInitializer(function () {
      const router = new this();
      const metadata = getMetadata(annotationName, context);
      setInjectables(container, router, metadata);
      setGlobal(container, keys.router, router);
    });

    setGlobal(container, keys.routerClass, constructor);
  }) as ClassDecorator<T>;
