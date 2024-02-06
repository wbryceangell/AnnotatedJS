import { RequestHandler } from "../../../interfaces/router";
import getMethods from "../getMethods";

export default (key: string) =>
  (path = "/") =>
    ((target, property) => {
      if (typeof path !== "string")
        throw new Error(
          `Invalid Method path argument ${JSON.stringify(
            path,
          )}. Argument must be a string`,
        );
      if (path.length === 0)
        throw new Error("Method path argument is an empty string");
      // @ts-ignore
      if (typeof target[property] !== "function")
        throw new Error(
          "Method annotation must be used on a Controller method",
        );
      const methods = getMethods(key, target);
      methods.push({ path, property });
      Reflect.defineMetadata(key, methods, target);
    }) as (
      target: Object,
      propertyKey: string | symbol,
      descriptor: TypedPropertyDescriptor<RequestHandler>,
    ) => TypedPropertyDescriptor<RequestHandler> | void;
