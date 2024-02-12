import { container as defaultContainer } from "../container/container";
import { keys } from "../container/keys";
import { setGlobal } from "../container/utils/setGlobal";
import { Class, ClassDecorator } from "./types";

export const CacheStorage = (container = defaultContainer) =>
  ((constructor) => {
    setGlobal(container, keys.cacheStorageClass, constructor);
  }) as ClassDecorator<Class<CacheStorage>>;
