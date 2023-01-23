import "urlpattern-polyfill";
import "reflect-metadata";
import "./controllers/getTest";
import "./controllers/postTest";
import router from "./router";

const swAddEventListener =
  addEventListener as ServiceWorkerGlobalScope["addEventListener"];

swAddEventListener("fetch", router);
