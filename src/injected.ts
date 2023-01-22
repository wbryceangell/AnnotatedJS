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
];
