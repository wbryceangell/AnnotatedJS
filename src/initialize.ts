import { container as defaultContainer } from "./container/container";
import { keys } from "./container/keys";
import { getGlobal } from "./container/utils/getGlobal";
import { getRouter } from "./container/utils/getRouter";
import { Class } from "./decorators/types";

export const initialize = (container = defaultContainer) => {
  const configClasses: Array<Class<unknown>> = getGlobal(
    container,
    keys.configClasses
  );

  if (Array.isArray(configClasses)) {
    for (const configClass of configClasses) {
      new configClass();
    }
  }

  const routerClass = getGlobal(container, keys.routerClass);
  if (typeof routerClass !== "function") {
    throw new Error("Router class is not in the container");
  }

  const router = getRouter(container);
  return router.handle.bind(router);
};
