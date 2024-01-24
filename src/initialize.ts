import { container as defaultContainer } from "./container/container";
import { getRouter } from "./container/utils/getRouter";

export const initialize = (container = defaultContainer) => {
  const router = getRouter(container);
  return router.handle.bind(router);
};
