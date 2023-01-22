import { controller } from "./decorators/class/controller";
import { controllersKey } from "./decorators/keys";
import { Route } from "./router";

export const routes: Array<Route> = [
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
      @controller("/something")
      class test {}

      console.dir(Reflect.getOwnMetadata(controllersKey, self)[0]);
      return new Response("hello");
    },
  },
];
