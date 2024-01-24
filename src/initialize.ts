import { container as defaultContainer } from "./container/container";
import { getRouter } from "./container/utils/getRouter";

export const initialize = (container = defaultContainer) => {
  return getRouter(container).handle;
};
