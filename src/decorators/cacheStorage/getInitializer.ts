import { keys } from "../../container/keys";
import { setGlobal } from "../../container/utils/setGlobal";
import { AnnotatedCacheStorage } from "../../interfaces/annotatedCacheStorage";
import { setInjectables } from "../inject/setInjectables";
import { Class } from "../types";
import { getMetadata } from "../utils/getMetadata";

export function getInitializer(
  annotationName: string,
  context: ClassDecoratorContext<Class<AnnotatedCacheStorage>>,
  container: Record<string, unknown>,
): (this: Class<AnnotatedCacheStorage>) => void {
  return function () {
    const cacheStorage = new this();
    const metadata = getMetadata(annotationName, context);
    setInjectables(container, cacheStorage, metadata);
    setGlobal(container, keys.cacheStorage, cacheStorage);
  };
}
