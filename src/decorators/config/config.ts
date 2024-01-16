import setGlobal from "../../global/utils/setGlobal";
import { routerKey } from "../../keys";
import { ConfigConstructor } from "../types";
import getProperties from "./getProperties";

export const Config = ({ prototype }: ConfigConstructor) => {
  if (!prototype.getRouter) throw new Error("Config getRouter must be defined");
  const router = prototype.getRouter.call(prototype);
  if (router === null || typeof router !== "object")
    throw new Error("Config router must be an object");
  setGlobal(routerKey, router);
  const properties = getProperties(prototype);
  for (const { property, methodName } of properties) {
    // @ts-ignore
    const propertyValue = prototype[methodName].call(prototype);
    if (propertyValue === undefined)
      throw new Error(`Config property ${property.toString()} is undefined`);
    setGlobal(property, propertyValue);
  }
};
