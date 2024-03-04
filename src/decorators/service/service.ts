import { container as defaultContainer } from "../../container/container";
import { keys } from "../../container/keys";
import { validateContainer } from "../../container/utils/validateContainer";
import { getInitializer } from "./getInitializer";
import { Class, ClassDecorator } from "../types";
import { addClassToContainer } from "../utils/addClassToContainer";
import { validateKind } from "../utils/validateKind";
import { validateName } from "../utils/validateName";

/**
 * A class decorator that makes the class injectable
 *
 * @remarks
 *
 * `@Service` will specify the class as one that can be injected
 *
 * The class is used as the lookup when injecting the service
 *
 * @example
 * ```ts
 * import { Service } from "@fork-git-it/annotatedjs";
 *
 * @Service()
 * export class ExampleService {
 *   doSomething() {}
 * }
 * ```
 *
 * @typeParam T - Type of the annotated class
 *
 * @param container - Object that stores injectables
 */
export const Service = <T extends Class<object>>(
  container = defaultContainer,
) =>
  ((constructor, context) => {
    validateContainer(container);

    const annotationName = `@${Service.name}`;
    validateKind(annotationName, context, "class");
    validateName(annotationName, context);

    context.addInitializer(
      getInitializer<T>(annotationName, context, container),
    );

    addClassToContainer(container, keys.serviceClasses, constructor);
  }) as ClassDecorator<T>;
