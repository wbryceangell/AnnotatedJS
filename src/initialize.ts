import "urlpattern-polyfill";
import "reflect-metadata";
import router from "./router";
import setCaches from "./global/caches/setCaches";

export type Config = { caches?: CacheStorage };

export const initialize =
  (config: Config = { caches }) =>
  (event: Event) => {
    if (!config.caches)
      throw new Error(
        "Failed to initialize. caches implementation is undefined"
      );
    setCaches(config.caches);
    router().handleEvent(event);
  };
