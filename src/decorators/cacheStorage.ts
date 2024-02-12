import { container as defaultContainer } from "../container/container";
import { keys } from "../container/keys";
import { setGlobal } from "../container/utils/setGlobal";
import { validateContainer } from "../container/utils/validateContainer";
import { Class, ClassDecorator } from "./types";
import { validateKind } from "./utils/validateKind";

export const CacheStorage = (container = defaultContainer) =>
  ((constructor, context) => {
    validateContainer(container);

    const annotationName = `@${CacheStorage.name}`;
    validateKind(annotationName, context, "class");

    setGlobal(container, keys.cacheStorageClass, constructor);
  }) as ClassDecorator<Class<CacheStorage>>;
