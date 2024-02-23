import normalizePath from "normalize-path";
import { keys } from "../../../container/keys";
import { getGlobal } from "../../../container/utils/getGlobal";
import { AnnotatedCacheStorage } from "../../../interfaces/annotatedCacheStorage";
import { AnnotatedRouter } from "../../../interfaces/annotatedRouter";
import { setInjectables } from "../../inject/setInjectables";
import { Class, HttpMethodMetadata } from "../../types";
import { getMetadata } from "../../utils/getMetadata";
import { getMetadataProperty } from "../../utils/getMetadataProperty";
import { MetadataProperties } from "../metadataProperties";
import { getRequestHandler } from "./getRequestHandler";

export const getInitializer = <T extends Class<object>>(
  container: Record<string, unknown>,
  annotationName: string,
  context: ClassDecoratorContext<T>,
  controllerPath: string,
) =>
  function (this: T) {
    const controller = new this();

    const metadata = getMetadata(annotationName, context);
    setInjectables(container, controller, metadata);

    const methods = <Array<HttpMethodMetadata>>(
      getMetadataProperty(metadata, MetadataProperties.methods, [])
    );

    const controllerMethodMetadata = methods.map((methodMetadata) => ({
      ...methodMetadata,
      handler: methodMetadata.handler.bind(controller),
    }));

    let router = getGlobal(
      container as Record<string, AnnotatedRouter>,
      keys.router,
    );
    const cacheStorage = getGlobal(
      container as Record<string, AnnotatedCacheStorage>,
      keys.cacheStorage,
    );
    for (const {
      path: methodPath,
      handler,
      httpMethod,
      cacheName,
    } of controllerMethodMetadata) {
      const routerMethod = <Exclude<keyof AnnotatedRouter, "handle">>(
        httpMethod.toLowerCase()
      );

      if (typeof router[routerMethod] !== "function") {
        throw new Error(
          `Router is improperly configured. It should include ${routerMethod} method`,
        );
      }

      router = router[routerMethod](
        normalizePath("/" + [controllerPath, methodPath].join("/"), true),
        getRequestHandler(cacheStorage, handler, controller, cacheName),
      );
    }
  };
