import { initialize } from "@src";
import "./serviceWorkerConfig";
import "./controllers/storageController";

const requestHandler = initialize();
const eventHandler = (evt: Event) => {
  (<FetchEvent>evt).respondWith(requestHandler((<FetchEvent>evt).request));
};
addEventListener("fetch", eventHandler);
