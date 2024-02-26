import { RequestHandler } from "../../../interfaces/types";
import { ClassMethodDecorator } from "../../types";
import { getHttpMethod } from "./getHttpMethod";

/**
 * A class method decorator that specifies a PATCH endpoint
 *
 * @see {@link Controller} for example
 *
 * @param path - API endpoint path (optional)
 */
export const Patch: (path?: string) => ClassMethodDecorator<RequestHandler> =
  getHttpMethod("Patch");
