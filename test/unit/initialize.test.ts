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

    initialize({ [keys.configs]: [Config], [keys.router]: router });

    expect(spy).toHaveBeenCalled();
  });

  it("instantiates multiple configs", () => {
    const spy = jest.fn();
    class ConfigOne {
      constructor() {
        spy(this);
      }
    }
    class ConfigTwo {
      constructor() {
        spy(this);
      }
    }

    initialize({
      [keys.configs]: [ConfigOne, ConfigTwo],
      [keys.router]: router,
    });

    expect(spy).toHaveBeenNthCalledWith(1, expect.any(ConfigOne));
    expect(spy).toHaveBeenNthCalledWith(2, expect.any(ConfigTwo));
  });

  it("errors if a router is not in the container", () => {
    expect(() => initialize({ [keys.configs]: [class {}] })).toThrow();
  });
});
