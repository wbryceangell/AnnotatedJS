import { WorkerRouter } from "@worker-tools/router";
import { getControllers } from "./decorators/class/controller";
import { getKey, methodKeys } from "./decorators/keys";
import getMethods from "./decorators/method/getMethods";

let router = new WorkerRouter();

for (const controller of getControllers()) {
  let controllerRouter = new WorkerRouter();
  for (const methodKey of methodKeys) {
    const methods = getMethods(methodKey, controller.constructor.prototype);
    switch (methodKey) {
      case getKey: {
        for (const method of methods) {
          controllerRouter = controllerRouter.get(
            method.path,
            controller.constructor.prototype[method.property]
          );
        }
      }
    }
  }
  router = router.use(controller.path, controllerRouter);
}

router = router.recover("*", (req) => {
  return fetch(req);
});

export default router;
