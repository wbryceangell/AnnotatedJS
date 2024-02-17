import { RequestHandler } from "./types";

/**
 * @remarks
 *
 * This is a [Fluent interface](https://en.wikipedia.org/wiki/Fluent_interface)
 *
 * @see
 *
 * {@link Router} for usage
 *
 * {@link https://github.com/kwhitley/itty-router | Itty-Router} for the inspiration behind the interface
 */
export interface AnnotatedRouter {
  get(uri: string, handler: RequestHandler): AnnotatedRouter;
  put(uri: string, handler: RequestHandler): AnnotatedRouter;
  post(uri: string, handler: RequestHandler): AnnotatedRouter;
  patch(uri: string, handler: RequestHandler): AnnotatedRouter;
  delete(uri: string, handler: RequestHandler): AnnotatedRouter;
  all(uri: string, handler: RequestHandler): AnnotatedRouter;
  handle: RequestHandler;
}
