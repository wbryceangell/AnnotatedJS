import { container as defaultContainer } from "../../global/container";
import { setGlobal } from "../../global/utils/setGlobal";
import { validateContainer } from "../../global/utils/validateContainer";
import { routerKey } from "../../keys";
import {
  type ConfigConstructor,
  type ConfigMetadataProperties,
} from "../types";
import { getMetadata } from "../utils/getMetadata";
import { getMetadataProperty } from "../utils/getMetadataProperty";
import { validateKind } from "../utils/validateKind";
import { MetadataProperties } from "./metadataProperties";

export const Config =
  (container = defaultContainer) =>
  (constructor: ConfigConstructor, context: ClassDecoratorContext) => {
    validateContainer(container);

    const annotationName = `@${Config.name}`;
    validateKind(annotationName, context, "class");

    const { prototype } = constructor;
    // TODO: Move Router to an annotation
    if (!prototype.getRouter) {
      throw new Error("Config getRouter must be defined");
    }

    const router = prototype.getRouter.call(prototype);
    if (router === null || typeof router !== "object") {
      throw new Error("Config router must be an object");
    }

    setGlobal(container as Record<string, typeof router>, routerKey, router);

    const metadata = getMetadata(annotationName, context);
    const properties = <ConfigMetadataProperties>(
      getMetadataProperty(metadata, MetadataProperties.properties, [])
    );

    for (const [property, method] of properties) {
      const value = method.call(prototype);
      if (value === undefined) {
        throw new Error(`Config property ${property.toString()} is undefined`);
      }
      setGlobal(container as Record<string, typeof value>, property, value);
    }
  };
