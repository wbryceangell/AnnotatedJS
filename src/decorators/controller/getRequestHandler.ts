import { AnnotatedCacheStorage } from "../../interfaces/annotatedCacheStorage";
import { RequestHandler } from "../../interfaces/types";

export const getRequestHandler =
  (
    cacheStorage: AnnotatedCacheStorage,
    handler: RequestHandler,
    controller: object,
    cacheName?: string,
  ) =>
  async (request: Request) => {
    let cache: Awaited<ReturnType<AnnotatedCacheStorage["open"]>> | undefined;
    if (cacheName) {
      cache = await cacheStorage.open(cacheName);

      const response = await cache.match(request);
      if (response) {
        return response;
      }
    }

    const response = await handler.call(controller, request);

    if (cache) {
      await cache.put(request, response);
    }

    return response;
  };
