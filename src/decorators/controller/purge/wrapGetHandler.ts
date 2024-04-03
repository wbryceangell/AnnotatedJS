import { keys } from "../../../container/keys";
import { getGlobal } from "../../../container/utils/getGlobal";
import { AnnotatedCacheStorage } from "../../../interfaces/annotatedCacheStorage";
import { GetHandler } from "../../types";

export const wrapGetHandler = (getHandler: GetHandler, cacheName: string) =>
  ((container, controller) => async (request: Request) => {
    const response = await getHandler(container, controller)(request);

    const cacheStorage = getGlobal(
      container as Record<string, AnnotatedCacheStorage>,
      keys.cacheStorage,
    );

    if (await cacheStorage.has(cacheName)) {
      await cacheStorage.delete(cacheName);
    }

    return response;
  }) as GetHandler;
