import normalizePath from "normalize-path";
import { getControllers } from "../decorators/class/controller";
import getMethods from "../decorators/method/utils/getMethods";
import { CacheMetadata, HttpMethodMetadata } from "../decorators/types";
import { Router } from "../interfaces/router";
import { cacheKey, methodKeys } from "../keys";
import getRoute from "./getRoute";

export default (router: Router) => {
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
};
