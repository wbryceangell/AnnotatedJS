import setGlobal from "../../global/utils/setGlobal";
import { routerKey } from "../../keys";
import { ConfigConstructor, ConfigMetadataProperties } from "../types";

export const Config = (
  { prototype }: ConfigConstructor,
  { metadata }: ClassDecoratorContext
) => {
  if (!prototype.getRouter) throw new Error("Config getRouter must be defined");
  const router = prototype.getRouter.call(prototype);
  if (router === null || typeof router !== "object")
    throw new Error("Config router must be an object");
  setGlobal(routerKey, router);
  if (!metadata) throw new Error("Config could not use metadata");
  if (!metadata.properties) metadata.properties = [];
  // @ts-ignore
  for (const [property, method] of <ConfigMetadataProperties>(
    metadata.properties
  )) {
    // @ts-ignore
    const propertyValue = method.call(prototype);
    if (propertyValue === undefined)
      throw new Error(`Config property ${property.toString()} is undefined`);
    setGlobal(property, propertyValue);
  }
};
