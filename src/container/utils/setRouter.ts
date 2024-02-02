import type { AnnotatedRouter } from "../../decorators/types";
import { keys } from "../keys";
import { setGlobal } from "./setGlobal";

export const setRouter = (
  container: Record<string, AnnotatedRouter>,
  router: AnnotatedRouter
) => {
  setGlobal(container, keys.router, router);
};
