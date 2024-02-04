import { container as defaultContainer } from "./container/container";
import { keys } from "./container/keys";
import { getGlobal } from "./container/utils/getGlobal";
import { getRouter } from "./container/utils/getRouter";
import { Class } from "./decorators/types";

export const initialize = (container = defaultContainer) => {
  for (const configClass of <Array<Class<unknown>>>(
    getGlobal(container, keys.configClasses)
  )) {
    new configClass();
  }

  const routerClass = getGlobal(container, keys.routerClass);
  if (typeof routerClass !== "function") {
    throw new Error("Router class is not in the container");
  }

  const router = getRouter(container);
  return router.handle.bind(router);
};
