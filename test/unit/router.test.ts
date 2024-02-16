import { Router } from "../../src";
import { keys } from "../../src/container/keys";
import {
  itAddsClassToContainer,
  itAddsClassToContainerOnlyOnce,
} from "./utils";

describe("@Router", () => {
  const name = "Router";

  itAddsClassToContainer(name, Router, keys.routerClass);
  itAddsClassToContainerOnlyOnce(name, Router);
});
