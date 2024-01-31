import type { AnnotatedRouter } from "../../decorators/types";
import { setGlobal } from "./setGlobal";

export const setRouter = (
  container: Record<string, AnnotatedRouter>,
  router: AnnotatedRouter
) => {
  setGlobal(container, "Router", router);
};
