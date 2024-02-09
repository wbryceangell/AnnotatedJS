import { ClassAccessorDecorator, InjectableMetadata } from "../types";
import { getMetadata } from "../utils/getMetadata";
import { getMetadataProperty } from "../utils/getMetadataProperty";
import { setMetadataProperty } from "../utils/setMetadataProperty";
import { validateKind } from "../utils/validateKind";
import { MetadataProperties } from "./metadataProperties";

/**
 * A class accessor decorator that injects a property
 *
 * @remarks
 *
 * `@Inject` is the annotation that allows for injection across classes
 *
 * It accepts two different types of arguments: a string or a class
 *
 * @example
 * ```ts
 * import { Inject, Service } from "@fork-git-it/annotatedjs";
 * // import AnotherService
 *
 * @Service()
 * export class ExampleService {
 *   @Inject("Property")
 *   private accessor injectedProp: unknown;
 *
 *   @Inject(AnotherService)
 *   private accessor injectedService: AnotherService;
 * }
 * ```
 *
 * @typeParam T - Type of the encapsulating class
 *
 * @typeParam K - The annotated accessor's type
 *
 * @param key - Unique key for the injectable value
 */
export const Inject = <T, K>(key: NewableFunction | string) =>
  ((_: unknown, context: ClassAccessorDecoratorContext) => {
    const annotationName = `@${Inject.name}`;
    validateKind(annotationName, context, "accessor");

    const metadata = getMetadata(annotationName, context);
    const injectables = <Array<InjectableMetadata>>(
      getMetadataProperty(metadata, MetadataProperties.injectables, [])
    );

    injectables.push({
      key: key instanceof Function ? key.name : key,
      set: context.access.set,
    });

    setMetadataProperty(metadata, MetadataProperties.injectables, injectables);
  }) as ClassAccessorDecorator<T, K>;
