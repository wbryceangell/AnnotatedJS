import { RequestHandler } from "../../../../interfaces/router";
import getMethods from "../../utils/getMethods";

export default (key: string) =>
  (path = "/") =>
    ((target, property) => {
      const methods = getMethods(key, target);
      methods.push({ path, property });
      Reflect.defineMetadata(key, methods, target);
    }) as (
      target: Object,
      propertyKey: string | symbol,
      descriptor: TypedPropertyDescriptor<RequestHandler>
    ) => TypedPropertyDescriptor<RequestHandler> | void;
