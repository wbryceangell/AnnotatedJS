import { keys } from "../../src/container/keys";
import { initialize } from "../../src/index";

describe("initialize", () => {
  const router = { handle: () => {} };

  it("errors if a config is not in container", () => {
    expect(() => initialize({ [keys.router]: router })).toThrow();
  });

  it("instantiates a config", () => {
    const spy = jest.fn();
    class Config {
      constructor() {
        spy();
      }
    }
    const container = { [keys.configs]: [Config], [keys.router]: router };
    initialize(container);
    expect(spy).toHaveBeenCalled();
  });
});
