import { keys } from "../../../container/keys";
import { getGlobal } from "../../../container/utils/getGlobal";
import { AnnotatedCacheStorage } from "../../../interfaces/annotatedCacheStorage";
import { GetHandler } from "../../types";

export const buildGetHandler = (getHandler: GetHandler, cacheName: string) =>
  ((container, controller) => async (request: Request) => {
    const cacheStorage = getGlobal(
      container as Record<string, AnnotatedCacheStorage>,
      keys.cacheStorage,
    );
    const cache = await cacheStorage.open(cacheName);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    const response = await getHandler(container, controller)(request);

    if (cache) {
      await cache.put(request, response);
    }

    return response;
  }) as GetHandler;
