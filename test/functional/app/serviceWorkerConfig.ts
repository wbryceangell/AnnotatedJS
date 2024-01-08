import { Config, Property, Router } from "@src";
import { Router as IttyRouter } from "itty-router";

@Config
export class ServiceWorkerConfig {
  getRouter(): Router {
    return IttyRouter();
  }

  @Property(Symbol.for("Storage"))
  getStorage(): Map<string, string> {
    const map = new Map();
    map.set("key", JSON.stringify({ test: "test" }));
    return map;
  }
}
