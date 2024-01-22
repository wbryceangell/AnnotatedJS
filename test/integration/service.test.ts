import { Inject, Service } from "../../src/index";

describe("Service", () => {
  it("should not work when it does not have @Service annotation", () => {
    expect(() => {
      class TestService {}

      @Service({})
      class OtherService {
        @Inject(TestService)
        private accessor service: TestService;
      }
    }).toThrow();
  });

  it("should work when service has @Service annotation", () => {
    expect(() => {
      const container = {};

      @Service(container)
      class TestService {}

      @Service(container)
      class OtherService {
        @Inject(TestService)
        private accessor service: TestService;
      }
    }).not.toThrow();
  });
});
