import { container as defaultContainer } from "./container/container";
import { keys } from "./container/keys";
import { getGlobal } from "./container/utils/getGlobal";
import { getRouter } from "./container/utils/getRouter";
import { Class } from "./decorators/types";

export const initialize = (container = defaultContainer) => {
  for (const config of <Array<Class<unknown>>>(
    getGlobal(container, keys.configClasses)
  )) {
    new config();
  }

  const router = getRouter(container);
  return router.handle.bind(router);
};
