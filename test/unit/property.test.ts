import { keys } from "../../src/container/keys";
import { Property } from "../../src/index";

describe("@Property", () => {
  it("does not allow reserved keys", () => {
    for (const key of Object.values(keys)) {
      expect(() =>
        Property(key)(() => {}, {
          kind: "method",
          name: "Property",
          metadata: {},
          static: false,
          private: false,
          access: { has: () => false, get: () => () => {} },
          addInitializer: () => {},
        }),
      ).toThrow();
    }
  });
});
