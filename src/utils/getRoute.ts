import {
  CacheMetadata,
  ControllerMetadata,
  HttpMethodMetadata,
} from "../decorators/types.js";

import { RouteContext } from "@worker-tools/router";

export default (
  controllerMetadata: ControllerMetadata,
  httpMethodMetadata: HttpMethodMetadata,
  cacheMetadata?: CacheMetadata
) =>
  async (req: Request, ctx: RouteContext) => {
    let cache: Cache | null = null;
    if (cacheMetadata && !cacheMetadata.purge)
      cache = await caches.open(cacheMetadata.name);

    if (cache) {
      const res = await cache.match(req);
      if (res) return res;
    }

    const res = await (
      controllerMetadata.prototype[httpMethodMetadata.property] as Function
    ).call(controllerMetadata.prototype, req, ctx);

    if (
      cacheMetadata &&
      cacheMetadata.purge &&
      (await caches.has(cacheMetadata.name))
    )
      await caches.delete(cacheMetadata.name);

    if (cache) await cache.put(req, (res as Response).clone());

    return res;
  };
