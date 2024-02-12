import { RequestHandler } from "./types";

export interface AnnotatedRouter {
  get(uri: string, handler: RequestHandler): AnnotatedRouter;
  put(uri: string, handler: RequestHandler): AnnotatedRouter;
  post(uri: string, handler: RequestHandler): AnnotatedRouter;
  patch(uri: string, handler: RequestHandler): AnnotatedRouter;
  delete(uri: string, handler: RequestHandler): AnnotatedRouter;
  all(uri: string, handler: RequestHandler): AnnotatedRouter;
  handle: RequestHandler;
}
