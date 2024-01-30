import { Config } from "../../src/index";
import {
  itCreatesClassInstanceInInitHook,
  itCreatesInstanceOfClass,
  itHasInitializationHook,
} from "./utils";

describe("@Config", () => {
  const name = "Config";

  itCreatesInstanceOfClass(name, Config({}));
  itHasInitializationHook(name, Config({}));
  itCreatesClassInstanceInInitHook(name, Config({}));
});
