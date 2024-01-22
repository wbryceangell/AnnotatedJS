import normalizePath from "normalize-path";
import { ControllerMetadata } from "./decorators/types";
import { getGlobal } from "./global/utils/getGlobal";
import { type Router } from "./interfaces/router";
import { controllersKey } from "./keys";

export const autowireRouter = (
  container: Record<string, unknown>,
  router: Router
) => {
  const controllers = <Array<ControllerMetadata>>(
    getGlobal(container, controllersKey)
  );
  for (const { path: controllerPath, methodMetadata } of controllers) {
    for (const { path: methodPath, handler, httpMethod } of methodMetadata) {
      router = router[
        <Exclude<keyof Router, "handle">>httpMethod.toLowerCase()
      ](normalizePath([controllerPath, methodPath].join("/")), handler);
    }
  }
};
