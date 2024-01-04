import setGlobal from "../../global/utils/setGlobal";
import { routerKey } from "../../keys";
import { ConfigConstructor } from "../types";
import getProperties from "./getProperties";

export const Config = ({ prototype }: ConfigConstructor) => {
  const router = prototype.getRouter.call(prototype);
  setGlobal(routerKey, router);
  const properties = getProperties(prototype);
  for (const { property, methodName } of properties) {
    // @ts-ignore
    setGlobal(property, prototype[methodName].call(prototype));
  }
};
