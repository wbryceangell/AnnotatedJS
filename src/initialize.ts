import "reflect-metadata";
import "urlpattern-polyfill";
import setCaches from "./global/caches/setCaches";
import { Router } from "./interfaces/router";
import autowireRouter from "./utils/autowireRouter";

export type Config = { caches?: CacheStorage; router?: Router };

export const initialize = (config: Config = { caches }) => {
  const { router } = config;
  if (!router)
    throw new Error("Failed to initialize. router implementation is undefined");
  if (!config.caches)
    throw new Error("Failed to initialize. caches implementation is undefined");
  setCaches(config.caches);
  autowireRouter(router);
  return router.handle;
};
