import { container as defaultContainer } from "../../container/container";
import { keys } from "../../container/keys";
import { setGlobal } from "../../container/utils/setGlobal";
import { validateContainer } from "../../container/utils/validateContainer";
import type { Class, ClassDecorator, ConfigMetadataProperties } from "../types";
import { addClassToContainer } from "../utils/addClassToContainer";
import { getMetadata } from "../utils/getMetadata";
import { getMetadataProperty } from "../utils/getMetadataProperty";
import { validateKind } from "../utils/validateKind";
import { MetadataProperties } from "./metadataProperties";

/**
 * A class decorator that encapsulates injectable properties
 *
 * @remarks
 *
 * `@Config` defines values that will be available for injection
 *
 * `@Config` encapsulates `@Property` annotations. `@Property` takes a string as an argument and injects the returned value of the method using that string
 *
 * Properties may also use other properties in the config as long as they are declared in order
 *
 * @example
 * ```ts
 * import { Config } from "@fork-git-it/annotatedjs";
 *
 * @Config()
 * export class ExampleConfig {
 *   @Property("Injected")
 *   getInjected(): unknown {
 *     // return some value to be injected
 *   }
 *
 *   @Property("AnotherInjected")
 *   getAnotherInjected(): unknown {
 *     this.getInjected(); // will return singleton
 *     // return value to be injected
 *   }
 *}
 * ```
 *
 * @typeParam T - Type of the annotated class
 *
 * @param container - Object that stores injectables
 */
export const Config = <T extends Class<object>>(
  container: Record<string, Array<T>> = defaultContainer,
) =>
  ((constructor, context) => {
    validateContainer(container);

    const annotationName = `@${Config.name}`;
    validateKind(annotationName, context, "class");

    context.addInitializer(function () {
      const config = new this();

      const metadata = getMetadata(annotationName, context);
      const properties = <ConfigMetadataProperties>(
        getMetadataProperty(metadata, MetadataProperties.properties, [])
      );

      const prototype = Object.getPrototypeOf(config);
      for (const prop of properties) {
        Object.defineProperty(prototype, prop[1].name, {
          value: undefined,
          writable: true,
        });
      }

      for (const [property, method] of properties) {
        const value = method.call(config);

        if (value === undefined) {
          throw new Error(
            `${annotationName} property ${property.toString()} is undefined`,
          );
        }

        Object.defineProperty(prototype, method.name, {
          value: () => value,
        });
        setGlobal(container as Record<string, typeof value>, property, value);
      }
    });

    addClassToContainer(container, keys.configClasses, constructor);
  }) as ClassDecorator<T>;
