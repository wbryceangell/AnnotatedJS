import { container as defaultContainer } from "./global/container";
import { getRouter } from "./global/utils/getRouter";

export const initialize = (container = defaultContainer) => {
  return getRouter(container).handle;
};
