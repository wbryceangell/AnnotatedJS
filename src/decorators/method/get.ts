import { getKey } from "../keys";
import getMethods from "./getMethods";

export const Get: (path?: string) => MethodDecorator =
  (path = "/") =>
  (target, property) => {
    const gets = getMethods(getKey, target);
    gets.push({ path, property });
    Reflect.defineMetadata(getKey, gets, target);
  };
