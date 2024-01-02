export type RequestHandler = (req: Request) => Promise<Response>;
export type RouteBuilder = (uri: string, handler: RequestHandler) => Router;
export interface Router {
  get: RouteBuilder;
  put: RouteBuilder;
  post: RouteBuilder;
  patch: RouteBuilder;
  delete: RouteBuilder;
  all: RouteBuilder;
  handle: RequestHandler;
}
