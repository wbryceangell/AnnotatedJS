import type { Router } from "../../decorators/types";
import { setGlobal } from "./setGlobal";

export const setRouter = (
  container: Record<string, Router>,
  router: Router
) => {
  setGlobal(container, "Router", router);
};
