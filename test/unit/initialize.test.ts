import { keys } from "../../src/container/keys";
import { initialize } from "../../src/index";

describe("initialize", () => {
  class Router {
    handle() {}
  }
  const router = new Router();

  it("does not error if there are no config classes", () => {
    expect(() =>
      initialize({ [keys.router]: router, [keys.routerClass]: Router })
    ).not.toThrow();
  });

  it("instantiates a config class", () => {
    const spy = jest.fn();
    class Config {
      constructor() {
        spy();
      }
    }

    initialize({
      [keys.configClasses]: [Config],
      [keys.routerClass]: Router,
      [keys.router]: router,
    });

    expect(spy).toHaveBeenCalled();
  });

  it("instantiates multiple config classes", () => {
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
      [keys.configClasses]: [ConfigOne, ConfigTwo],
      [keys.routerClass]: Router,
      [keys.router]: router,
    });

    expect(spy).toHaveBeenNthCalledWith(1, expect.any(ConfigOne));
    expect(spy).toHaveBeenNthCalledWith(2, expect.any(ConfigTwo));
  });

  it("instantiates multiple service classes", () => {
    const spy = jest.fn();
    class ServiceOne {
      constructor() {
        spy(this);
      }
    }
    class ServiceTwo {
      constructor() {
        spy(this);
      }
    }

    initialize({
      [keys.serviceClasses]: [ServiceOne, ServiceTwo],
      [keys.routerClass]: Router,
      [keys.router]: router,
    });

    expect(spy).toHaveBeenNthCalledWith(1, expect.any(ServiceOne));
    expect(spy).toHaveBeenNthCalledWith(2, expect.any(ServiceTwo));
  });

  it("instantiates configs before services", () => {
    const spy = jest.fn();
    class Config {
      constructor() {
        spy(this);
      }
    }
    class Service {
      constructor() {
        spy(this);
      }
    }

    initialize({
      [keys.configClasses]: [Config],
      [keys.serviceClasses]: [Service],
      [keys.routerClass]: Router,
      [keys.router]: router,
    });

    expect(spy).toHaveBeenNthCalledWith(1, expect.any(Config));
    expect(spy).toHaveBeenNthCalledWith(2, expect.any(Service));
  });

  it("errors if a router class is not in the container", () => {
    expect(() =>
      initialize({ [keys.configClasses]: [class {}], [keys.router]: router })
    ).toThrow();
  });

  it("instantiates router class", () => {
    const spy = jest.fn();
    class Router {
      constructor() {
        spy();
      }
    }

    initialize({
      [keys.routerClass]: Router,
      [keys.router]: router,
    });

    expect(spy).toHaveBeenCalled();
  });

  it("instantiates multiple controller classes", () => {
    const spy = jest.fn();
    class ControllerOne {
      constructor() {
        spy(this);
      }
    }
    class ControllerTwo {
      constructor() {
        spy(this);
      }
    }

    initialize({
      [keys.controllerClasses]: [ControllerOne, ControllerTwo],
      [keys.routerClass]: Router,
      [keys.router]: router,
    });

    expect(spy).toHaveBeenNthCalledWith(1, expect.any(ControllerOne));
    expect(spy).toHaveBeenNthCalledWith(2, expect.any(ControllerTwo));
  });
});
