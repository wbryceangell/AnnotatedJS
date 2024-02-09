import { getHttpMethod } from "./getHttpMethod";
import { ClassMethodDecorator, RequestHandler } from "../../types";

/**
 * A class method decorator that specifies a GET endpoint
 *
 * @see {@link Controller} for example
 *
 * @param path - API endpoint path (optional)
 */
export const Get: (
  path?: string,
) => // @ts-expect-error request handler type does not conform to T type
ClassMethodDecorator<RequestHandler> = getHttpMethod("Get");
