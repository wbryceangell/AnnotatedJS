import { container as defaultContainer } from "./global/container";
import { getGlobal } from "./global/utils/getGlobal";
import { type Router } from "./interfaces/router";
import { routerKey } from "./keys";
import { autowireRouter } from "./autowireRouter";

export const initialize = (container = defaultContainer) => {
  const router: Router = getGlobal(container, routerKey);
  if (!router) {
    throw new Error("Failed to initialize. router implementation is undefined");
  }
  autowireRouter(container, router);
  return router.handle;
};
