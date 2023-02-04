import { RouteContext } from "@worker-tools/router";
import {
  CacheMetadata,
  ControllerMetadata,
  HttpMethodMetadata,
} from "../decorators/types";

export default (
    controllerMetadata: ControllerMetadata,
    httpMethodMetadata: HttpMethodMetadata,
    cacheMetadata?: CacheMetadata
  ) =>
  async (req: Request, ctx: RouteContext) => {
    const cache = cacheMetadata ? await caches.open(cacheMetadata.name) : null;

    if (cache) {
      const res = await cache.match(req);
      if (res) return res;
    }

    const res = await (
      controllerMetadata.prototype[httpMethodMetadata.property] as Function
    ).call(controllerMetadata.prototype, req, ctx);

    if (cache) {
      cache.put(req, res);
    }

    return res;
  };
