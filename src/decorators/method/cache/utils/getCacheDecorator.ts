import { RequestHandler } from "../../../../interfaces/router";
import { cacheKey } from "../../../../keys";
import { CacheMetadata } from "../../../types";
import getMethods from "../../utils/getMethods";

export default (purge: boolean) => (name: string) =>
  ((target, property) => {
    const methods = getMethods<CacheMetadata>(cacheKey, target);
    methods.push({ name, property, purge });
    Reflect.defineMetadata(cacheKey, methods, target);
  }) as (
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<RequestHandler>
  ) => TypedPropertyDescriptor<RequestHandler> | void;
