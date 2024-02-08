export interface AnnotatedRouter {
  get(uri: string, handler: RequestHandler): AnnotatedRouter;
  put(uri: string, handler: RequestHandler): AnnotatedRouter;
  post(uri: string, handler: RequestHandler): AnnotatedRouter;
  patch(uri: string, handler: RequestHandler): AnnotatedRouter;
  delete(uri: string, handler: RequestHandler): AnnotatedRouter;
  all(uri: string, handler: RequestHandler): AnnotatedRouter;
  handle(req: Request): Promise<Response>;
}
export type RequestHandler = (req: Request) => Promise<Response>;
export type RouteBuilder = (
  uri: string,
  handler: RequestHandler,
) => AnnotatedRouter;
export type HttpMethodMetadata = {
  path: string;
  httpMethod: string;
  handler: RequestHandler;
};
export type ConfigMetadataProperties = Array<[string, () => unknown]>;
export type RouterConstructor = {
  prototype: AnnotatedRouter;
};
export type InjectableMetadata = {
  key: string;
  set(object: unknown, value: unknown): void;
};
export type PropertyMethod<T> = () => T;
export type Class<T> = new (...args: unknown[]) => T;
export type ClassDecorator<T extends Class<unknown>> = (
  constructor: T,
  context: ClassDecoratorContext<T>,
) => void;
export type ClassMethodDecorator<
  T extends (...args: Array<unknown>) => unknown,
> = (method: T, context: ClassMethodDecoratorContext<unknown, T>) => void;
export type ControllerMethodDecorator = (
  path?: string,
) => // @ts-expect-error request handler type does not conform to unknown
ClassMethodDecorator<RequestHandler>;
