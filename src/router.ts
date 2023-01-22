import {
  Method,
  Handler,
  RouteContext,
  WorkerRouter,
} from "@worker-tools/router";
import { controller } from "./decorators/class/controller";
import { get } from "./decorators/method/get";
import { controllersKey, getKey } from "./decorators/keys";

export interface Route {
  method: Method;
  path: string;
  handler: Handler<RouteContext>;
}

let router = new WorkerRouter();

for (const route of getRoutes()) {
  switch (route.method) {
    case "GET":
      router = router.get(route.path, route.handler);
  }
}

// TODO: get injected paths and methods
// TODO: add injected values to the router

export default router;

@controller("/something")
class test {
  @get
  something() {
    return new Response("hello");
  }
}

function getRoutes(): Array<Route> {
  return [
    {
      method: "GET",
      path: "/",
      handler: async () => {
        return fetch("index.html");
      },
    },
    {
      method: "GET",
      path: "/app.js",
      handler: async () => {
        return fetch("app.js");
      },
    },
    {
      method: "GET",
      path: "/test",
      handler: async () => {
        const { controller }: { controller: typeof test } =
          Reflect.getOwnMetadata(controllersKey, self)[0];
        const method: keyof test = Reflect.getOwnMetadata(
          getKey,
          controller.prototype
        );
        controller.prototype[method]();
        return controller.prototype[method]();
      },
    },
  ];
}
