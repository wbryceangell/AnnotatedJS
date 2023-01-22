import router from "./router";

const swAddEventListener =
  addEventListener as ServiceWorkerGlobalScope["addEventListener"];

swAddEventListener("fetch", router);
