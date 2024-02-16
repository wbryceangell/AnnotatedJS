import { container as defaultContainer } from "../../container/container";
import { keys } from "../../container/keys";
import { setGlobal } from "../../container/utils/setGlobal";
import { validateContainer } from "../../container/utils/validateContainer";
import { AnnotatedCacheStorage } from "../../interfaces/annotatedCacheStorage";
import { setInjectables } from "../inject/setInjectables";
import { Class, ClassDecorator } from "../types";
import { getMetadata } from "../utils/getMetadata";
import { validateKind } from "../utils/validateKind";

export const CacheStorage = (container = defaultContainer) =>
  ((constructor, context) => {
    validateContainer(container);

    const annotationName = `@${CacheStorage.name}`;
    validateKind(annotationName, context, "class");

    context.addInitializer(function () {
      const cacheStorage = new this();
      const metadata = getMetadata(annotationName, context);
      setInjectables(container, cacheStorage, metadata);
      setGlobal(container, keys.cacheStorage, cacheStorage);
    });

    setGlobal(container, keys.cacheStorageClass, constructor);
  }) as ClassDecorator<Class<AnnotatedCacheStorage>>;
