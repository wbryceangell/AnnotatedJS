import { Router } from "../../decorators/types";
import { getGlobal } from "./getGlobal";

export const getRouter = (container: Record<string, Router>) => {
  const router = getGlobal(container, "Router");

  if (!router) {
    throw new Error("Router has not been configured");
  }

  return router;
};
