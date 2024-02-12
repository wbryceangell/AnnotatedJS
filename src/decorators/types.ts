import { RequestHandler } from "../interfaces/types";

export type HttpMethodMetadata = {
  path: string;
  httpMethod: string;
  handler: RequestHandler;
};

export type ConfigMetadataProperties = Array<[string, () => unknown]>;

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

export type ClassAccessorDecorator<T, K> = (
  target: ClassAccessorDecoratorTarget<T, K>,
  context: ClassAccessorDecoratorContext,
) => void;
