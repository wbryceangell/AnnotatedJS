import { container as defaultContainer } from "../container/container";
import { keys } from "../container/keys";
import { setGlobal } from "../container/utils/setGlobal";
import { validateContainer } from "../container/utils/validateContainer";
import { setInjectables } from "./inject/setInjectables";
import { Class, ClassDecorator } from "./types";
import { AnnotatedRouter } from "../interfaces/router";
import { getMetadata } from "./utils/getMetadata";
import { validateKind } from "./utils/validateKind";

/**
 * A class decorator that defines the router used by controllers
 *
 * @remarks
 *
 * `@Router` annotates the class that will handle incoming requests
 *
 * The class should implement the `AnnotatedRouter` interface. It is a [Fluent interface](https://en.wikipedia.org/wiki/Fluent_interface)
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

    context.addInitializer(function () {
      const router = new this();
      const metadata = getMetadata(annotationName, context);
      setInjectables(container, router, metadata);
      setGlobal(container, keys.router, router);
    });

    setGlobal(container, keys.routerClass, constructor);
  }) as ClassDecorator<Class<AnnotatedRouter>>;
