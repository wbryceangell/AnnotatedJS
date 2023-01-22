import {
  Method,
  Handler,
  RouteContext,
  WorkerRouter,
} from "@worker-tools/router";
import { routes } from "./injected";

export interface Route {
  method: Method;
  path: string;
  handler: Handler<RouteContext>;
}

let router = new WorkerRouter();

for (const route of routes) {
  switch (route.method) {
    case "GET":
      router = router.get(route.path, route.handler);
  }
}

// TODO: get injected paths and methods
// TODO: add injected values to the router

export default router;
