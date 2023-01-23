import { WorkerRouter } from "@worker-tools/router";
import { Controller } from "./decorators/class/controller";
import { controllersKey, getKey, methodKeys } from "./decorators/keys";

let router = new WorkerRouter();

const controllers = Reflect.getOwnMetadata(controllersKey, self);
if (controllers) {
  for (const controller of Array.from<Controller>(
    Reflect.getOwnMetadata(controllersKey, self)
  )) {
    for (const methodKey of methodKeys) {
      const method = Reflect.getOwnMetadata(
        methodKey,
        controller.constructor.prototype
      );
      switch (methodKey) {
        case getKey: {
          router = router.get(
            controller.path,
            controller.constructor.prototype[method]
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
