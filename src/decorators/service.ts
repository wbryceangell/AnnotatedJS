import { container as defaultContainer } from "../container/container";
import { keys } from "../container/keys";
import { setGlobal } from "../container/utils/setGlobal";
import { validateContainer } from "../container/utils/validateContainer";
import { setInjectables } from "./inject/setInjectables";
import { Class, ClassDecorator } from "./types";
import { addClassToContainer } from "./utils/addClassToContainer";
import { getMetadata } from "./utils/getMetadata";
import { validateKind } from "./utils/validateKind";

export const Service = <T extends Class<object>>(
  container = defaultContainer,
) =>
  ((constructor, context) => {
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

    addClassToContainer(container, keys.serviceClasses, constructor);
  }) as ClassDecorator<T>;
