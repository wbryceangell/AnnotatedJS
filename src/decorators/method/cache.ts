import getMethods from "./utils/getMethods";
import { Handler, RouteContext } from "@worker-tools/router";
import { cacheKey } from "../keys";
import { CacheMetadata } from "../types";

export const Cache = (name: string) =>
  ((target, property) => {
    const methods = getMethods<CacheMetadata>(cacheKey, target);
    methods.push({ name, property });
    Reflect.defineMetadata(cacheKey, methods, target);
  }) as (
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<Handler<RouteContext>>
  ) => TypedPropertyDescriptor<Handler<RouteContext>> | void;
