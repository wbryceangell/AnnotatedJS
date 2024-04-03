import { container as defaultContainer } from "../../container/container";
import { keys } from "../../container/keys";
import { validateContainer } from "../../container/utils/validateContainer";
import type { Class, ClassDecorator } from "../types";
import { addClassToContainer } from "../utils/addClassToContainer";
import { validateKind } from "../utils/validateKind";
import { getInitializer } from "./getInitializer";

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

    context.addInitializer(
      getInitializer<T>(annotationName, context, container),
    );

    addClassToContainer(container, keys.configClasses, constructor);
  }) as ClassDecorator<T>;
