import { WorkerRouter } from "@worker-tools/router";
import { getControllers } from "./decorators/class/controller";
import { getKey, methodKeys } from "./decorators/keys";
import getMethods from "./decorators/method/getMethods";
import normalizePath from "normalize-path";

let router = new WorkerRouter();

for (const controller of getControllers()) {
  for (const methodKey of methodKeys) {
    const methods = getMethods(methodKey, controller.constructor.prototype);
    switch (methodKey) {
      case getKey: {
        for (const method of methods) {
          router = router.get(
            normalizePath([controller.path, method.path].join("/")),
            controller.constructor.prototype[method.property]
          );
        }
      }
    }
  }
}

router = router.recover("*", (req) => {
  return fetch(req);
});

export default router;
