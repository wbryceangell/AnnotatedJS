import "reflect-metadata";
import getGlobal from "./global/utils/getGlobal";
import { Router } from "./interfaces/router";
import { routerKey } from "./keys";
import autowireRouter from "./utils/autowireRouter";

export const initialize = () => {
  const router: Router = getGlobal(routerKey);
  if (!router)
    throw new Error("Failed to initialize. router implementation is undefined");
  autowireRouter(router);
  return router.handle;
};
