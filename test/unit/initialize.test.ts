import { keys } from "../../src/container/keys";
import { initialize } from "../../src/index";

describe("initialize", () => {
  class Router {
    handle() {}
  }
  const router = new Router();

  const itInstantiatesMultipleClasses = (key: string) =>
    it(`instantiates multiple ${key}`, () => {
      const spy = jest.fn();
      class ClassOne {
        constructor() {
          spy(this);
        }
      }
      class ClassTwo {
        constructor() {
          spy(this);
        }
      }

      initialize({
        [key]: [ClassOne, ClassTwo],
        [keys.routerClass]: Router,
        [keys.router]: router,
      });

      expect(spy).toHaveBeenNthCalledWith(1, expect.any(ClassOne));
      expect(spy).toHaveBeenNthCalledWith(2, expect.any(ClassTwo));
    });

  itInstantiatesMultipleClasses(keys.configClasses);
  itInstantiatesMultipleClasses(keys.serviceClasses);
  itInstantiatesMultipleClasses(keys.controllerClasses);
	itInstantiatesMultipleClasses(keys.datastoreClasses);

  it("errors if a router class is not in the container", () => {
    expect(() =>
      initialize({ [keys.configClasses]: [class {}], [keys.router]: router }),
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

  it("instantiates cache storage", () => {
    const spy = jest.fn();

    initialize({
      [keys.routerClass]: Router,
      [keys.router]: router,
      [keys.cacheStorageClass]: class {
        constructor() {
          spy();
        }
      },
    });

    expect(spy).toHaveBeenCalled();
  });

  it("instantiates in order", () => {
    const spy = jest.fn();
    class Config {
      constructor() {
        spy(this);
      }
    }
		class Datastore {
			constructor() {
        spy(this);
      }
		}
    class Service {
      constructor() {
        spy(this);
      }
    }
    class Router {
      constructor() {
        spy(this);
      }
    }
    class Controller {
      constructor() {
        spy(this);
      }
    }

    initialize({
      [keys.configClasses]: [Config],
			[keys.datastoreClasses]: [Datastore],
      [keys.serviceClasses]: [Service],
      [keys.routerClass]: Router,
      [keys.controllerClasses]: [Controller],
      [keys.router]: router,
    });

    expect(spy).toHaveBeenNthCalledWith(1, expect.any(Config));
		expect(spy).toHaveBeenNthCalledWith(2, expect.any(Datastore));
    expect(spy).toHaveBeenNthCalledWith(3, expect.any(Service));
    expect(spy).toHaveBeenNthCalledWith(4, expect.any(Router));
    expect(spy).toHaveBeenNthCalledWith(5, expect.any(Controller));
  });
});
