import { getKey } from "../keys";

export const get: MethodDecorator = (target, property) => {
  if (typeof Reflect.getOwnMetadata(getKey, target) !== "undefined")
    throw new Error("attempted to set more than one get handler");
  Reflect.defineMetadata(getKey, property, target);
};
