import { Config } from "../../src/index";
import { itCreatesInstanceOfClass } from "./utils";

describe("@Config", () => {
  const name = "Config";

  itCreatesInstanceOfClass(name, Config({}));
});
