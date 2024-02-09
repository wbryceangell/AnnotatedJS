import { ClassMethodDecorator, RequestHandler } from "../../types";
import { getHttpMethod } from "./getHttpMethod";

/**
 * A class method decorator that specifies a PATCH endpoint
 *
 * @see {@link Controller} for example
 *
 * @param path - API endpoint path (optional)
 */
export const Patch: (
  path?: string,
) => // @ts-expect-error request handler type does not conform to T type
ClassMethodDecorator<RequestHandler> = getHttpMethod("Patch");
