import {
  CacheMetadata,
  ControllerMetadata,
  HttpMethodMetadata,
} from "../decorators/types";
import getCaches from "../global/caches/getCaches";

export default (
    controllerMetadata: ControllerMetadata,
    httpMethodMetadata: HttpMethodMetadata,
    cacheMetadata?: CacheMetadata
  ) =>
  async (req: Request) => {
    const caches = getCaches();
    let cache: Cache | null = null;
    if (cacheMetadata && !cacheMetadata.purge)
      cache = await caches.open(cacheMetadata.name);

    if (cache) {
      const res = await cache.match(req);
      if (res) return res;
    }

    const res = await (
      controllerMetadata.prototype[httpMethodMetadata.property] as Function
    ).call(controllerMetadata.prototype, req);

    if (
      cacheMetadata &&
      cacheMetadata.purge &&
      (await caches.has(cacheMetadata.name))
    )
      await caches.delete(cacheMetadata.name);

    if (cache) await cache.put(req, (res as Response).clone());

    return res;
  };
