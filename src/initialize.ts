import { container as defaultContainer } from "./container/container";
import { keys } from "./container/keys";
import { getGlobal } from "./container/utils/getGlobal";
import { AnnotatedRouter, Class } from "./decorators/types";

export const initialize = (container = defaultContainer) => {
  instantiateClasses(container, keys.configClasses);
  instantiateClasses(container, keys.serviceClasses);

  const routerClass: Class<AnnotatedRouter> = getGlobal(
    container,
    keys.routerClass
  );

  if (typeof routerClass !== "function") {
    throw new Error("Router class is not in the container");
  }

  new routerClass();

  instantiateClasses(container, keys.controllerClasses);

  const router: AnnotatedRouter = getGlobal(container, keys.router);
  return router.handle.bind(router);
};

const instantiateClasses = (
  container: Record<string, Array<Class<unknown>>>,
  key: string
) => {
  const containerClasses = getGlobal(container, key);

  if (Array.isArray(containerClasses)) {
    for (const containerClass of containerClasses) {
      new containerClass();
    }
  }
};
