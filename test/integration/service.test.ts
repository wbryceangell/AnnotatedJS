import { Inject, Service } from "../../src/index";

describe("Service", () => {
  it("should not work when it does not have @Service annotation", () => {
    expect(() => {
      class TestService {}
      class Test {
        @Inject(TestService) private service: any;
      }
    }).toThrow();
  });

  it("should work when service has @Service annotation", () => {
    expect(() => {
      @Service
      class TestService {}
      class Test {
        @Inject(TestService) private service: any;
      }
    }).not.toThrow();
  });
});
