import { WorkerRouter } from "@worker-tools/router";
import { getControllers } from "./decorators/class/controller";
import { cacheKey, methodKeys } from "./decorators/keys";
import getMethods from "./decorators/method/utils/getMethods";
import normalizePath from "normalize-path";
import { CacheMetadata, HttpMethodMetadata } from "./decorators/types";
import getRoute from "./utils/getRoute";

export default () => {
  let router = new WorkerRouter();

  for (const controllerMetadata of getControllers()) {
    const cacheMetadataList = getMethods<CacheMetadata>(
      cacheKey,
      controllerMetadata.prototype
    );
    for (const methodKey of methodKeys) {
      for (const httpMethodMetadata of getMethods<HttpMethodMetadata>(
        methodKey,
        controllerMetadata.prototype
      )) {
        const cacheMetadata = cacheMetadataList.find(
          (metadata) => metadata.property === httpMethodMetadata.property
        );
        //@ts-ignore
        router = router[methodKey](
          normalizePath(
            [controllerMetadata.path, httpMethodMetadata.path].join("/")
          ),
          getRoute(controllerMetadata, httpMethodMetadata, cacheMetadata)
        );
      }
    }
  }

  router = router.recover("*", (req) => {
    return fetch(req);
  });

  return router;
};
