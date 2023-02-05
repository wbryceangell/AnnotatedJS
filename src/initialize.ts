import "urlpattern-polyfill";
import "reflect-metadata";
import router from "./router";

export const initialize = () => (event: Event) => router().handleEvent(event);
