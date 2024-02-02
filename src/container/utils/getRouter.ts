import { AnnotatedRouter } from "../../decorators/types";
import { keys } from "../keys";
import { getGlobal } from "./getGlobal";

export const getRouter = (container: Record<string, AnnotatedRouter>) => {
  const router = getGlobal(container, keys.router);

  if (typeof router === "undefined") {
    throw new Error("Router has not been configured");
  }

  return router;
};
