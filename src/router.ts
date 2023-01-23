import { WorkerRouter } from "@worker-tools/router";
import { getControllers } from "./decorators/class/controller";
import { methodKeys } from "./decorators/keys";
import getMethods from "./decorators/method/utils/getMethods";
import normalizePath from "normalize-path";

let router = new WorkerRouter();

for (const controller of getControllers()) {
  for (const methodKey of methodKeys) {
    for (const method of getMethods(
      methodKey,
      controller.constructor.prototype
    )) {
      //@ts-ignore
      router = router[methodKey](
        normalizePath([controller.path, method.path].join("/")),
        controller.constructor.prototype[method.property]
      );
    }
  }
}

router = router.recover("*", (req) => {
  return fetch(req);
});

export default router;
