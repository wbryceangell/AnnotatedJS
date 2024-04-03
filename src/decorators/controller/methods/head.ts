import { RequestHandler } from "../../../interfaces/types";
import { ClassMethodDecorator } from "../../types";
import { getHttpMethod } from "./getHttpMethod";

/**
 * A class method decorator that specifies a HEAD endpoint
 *
 * @see {@link Controller} for example
 *
 * @param path - API endpoint path (optional)
 */
export const Head: (path?: string) => ClassMethodDecorator<RequestHandler> =
  getHttpMethod("Head");
