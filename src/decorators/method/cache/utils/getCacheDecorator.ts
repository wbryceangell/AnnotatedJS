import { Handler, RouteContext } from "@worker-tools/router";

import { CacheMetadata } from "../../../types.js";
import { cacheKey } from "../../../keys.js";
import getMethods from "../../utils/getMethods.js";

export default (purge: boolean) => (name: string) =>
  ((target, property) => {
    const methods = getMethods<CacheMetadata>(cacheKey, target);
    methods.push({ name, property, purge });
    Reflect.defineMetadata(cacheKey, methods, target);
  }) as (
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<Handler<RouteContext>>
  ) => TypedPropertyDescriptor<Handler<RouteContext>> | void;
