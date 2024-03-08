import { container as defaultContainer } from "../../container/container";
import { keys } from "../../container/keys";
import { setGlobal } from "../../container/utils/setGlobal";
import { validateContainer } from "../../container/utils/validateContainer";
import { AnnotatedRouter } from "../../interfaces/annotatedRouter";
import { Class, ClassDecorator } from "../types";
import { validateKind } from "../utils/validateKind";
import { getInitializer } from "./getInitializer";

/**
 * A class decorator that defines the router used by controllers
 *
 * @remarks
 *
 * `@Router` annotates the class that will handle incoming requests
 *
 * @see
 *
 * {@link AnnotatedRouter} for interface definition
 *
 * @example
 * ```ts
 * import { AnnotatedRouter, Router } from "@fork-git-it/annotatedjs";
 *
 * @Router()
 * export class ExampleRouter implements AnnotatedRouter {
 *   get(uri: string, handler: RequestHandler): AnnotatedRouter {
 *     // configure router to handle GET request
 *     return this;
 *   }
 *
 *   put(uri: string, handler: RequestHandler): AnnotatedRouter {
 *     // configure router to handle PUT request
 *     return this;
 *   }
 *
 *   post(uri: string, handler: RequestHandler): AnnotatedRouter {
 *     // configure router to handle POST request
 *     return this;
 *   }
 *
 *   patch(uri: string, handler: RequestHandler): AnnotatedRouter {
 *     // configure router to handle PATCH request
 *     return this;
 *   }
 *
 *   delete(uri: string, handler: RequestHandler): AnnotatedRouter {
 *     // configure router to handle DELETE request
 *     return this;
 *   }
 *
 *   all(uri: string, handler: RequestHandler): AnnotatedRouter {
 *     // configure router to handle all requests
 *     return this;
 *   }
 *
 *   handle(req: Request): Promise<Response> {
 *     // handle incoming request using the router
 *   }
 * }
 * ```
 *
 * @param container - Object that stores injectables
 */
export const Router = (container = defaultContainer) =>
  ((constructor, context) => {
    validateContainer(container);

    const annotationName = `@${Router.name}`;
    validateKind(annotationName, context, "class");

    context.addInitializer(getInitializer(annotationName, context, container));

    setGlobal(container, keys.routerClass, constructor);
  }) as ClassDecorator<Class<AnnotatedRouter>>;
