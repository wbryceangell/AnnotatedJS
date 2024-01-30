import { Config } from "../../src/index";
import { itCreatesInstanceOfClass, itHasInitializationHook } from "./utils";

describe("@Config", () => {
  const name = "Config";

  itCreatesInstanceOfClass(name, Config({}));
  itHasInitializationHook(name, Config({}));
});
