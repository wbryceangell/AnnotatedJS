import { container as defaultContainer } from "../container/container";
import { keys } from "../container/keys";
import { isInitializing } from "../container/utils/isInitializing";
import { setGlobal } from "../container/utils/setGlobal";
import { validateContainer } from "../container/utils/validateContainer";
import { Class, ClassDecorator } from "./types";
import { validateKind } from "./utils/validateKind";

export const CacheStorage = (container = defaultContainer) =>
  ((constructor, context) => {
    validateContainer(container);

    const annotationName = `@${CacheStorage.name}`;
    validateKind(annotationName, context, "class");

    context.addInitializer(function () {
      if (isInitializing(container)) {
        const cacheStorage = new this();
        setGlobal(container, keys.cacheStorage, cacheStorage);
      }
    });

    setGlobal(container, keys.cacheStorageClass, constructor);
  }) as ClassDecorator<Class<CacheStorage>>;
