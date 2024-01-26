import normalizePath from "normalize-path";
import { container as defaultContainer } from "../../container/container";
import { getRouter } from "../../container/utils/getRouter";
import { validateContainer } from "../../container/utils/validateContainer";
import { setInjectables } from "../inject/setInjectables";
import type { HttpMethodMetadata, AnnotatedRouter } from "../types";
import { getMetadata } from "../utils/getMetadata";
import { getMetadataProperty } from "../utils/getMetadataProperty";
import { validateKind } from "../utils/validateKind";
import { MetadataProperties } from "./metadataProperties";

export const Controller =
  <
    Class extends new (...args: unknown[]) => object = new (
      ...args: unknown[]
    ) => object
  >(
    controllerPath: string,
    container = defaultContainer
  ) =>
  (constructor: Class, context: ClassDecoratorContext<Class>) => {
    validateContainer(container);

    const annotationName = `@${Controller.name}`;
    validateKind(annotationName, context, "class");

    if (typeof controllerPath !== "string") {
      throw new Error(
        `Invalid Controller path argument ${JSON.stringify(
          controllerPath
        )}. Argument must be a string`
      );
    }

    if (controllerPath.length === 0) {
      throw new Error("Controller path argument is an empty string");
    }

    context.addInitializer(function () {
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

      let router = getRouter(container);
      for (const {
        path: methodPath,
        handler,
        httpMethod,
      } of controllerMethodMetadata) {
        const routerMethod = <Exclude<keyof AnnotatedRouter, "handle">>(
          httpMethod.toLowerCase()
        );

        if (typeof router[routerMethod] !== "function") {
          throw new Error(
            `Router is improperly configured. It should include ${routerMethod} method`
          );
        }

        router = router[routerMethod](
          normalizePath("/" + [controllerPath, methodPath].join("/"), true),
          handler
        );
      }
    });

    new constructor();
  };
