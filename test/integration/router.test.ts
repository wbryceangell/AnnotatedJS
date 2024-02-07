import { AnnotatedRouter, Router } from "../../src";
import { keys } from "../../src/container/keys";
import { RequestHandler } from "../../src/decorators/types";

describe("Router", () => {
  it("should work when it is used on a class", () => {
    expect(() => {
      // @ts-ignore
      @Router({})
      class TestRouter {}
    }).not.toThrow();
  });

  it("handles a request", async () => {
    const expectedBody = "body";
    const container: { Router?: TestRouter } = {};

    @Router(container)
    class TestRouter implements AnnotatedRouter {
      get(uri: string, handler: RequestHandler): AnnotatedRouter {
        throw new Error("Method not implemented.");
      }
      put(uri: string, handler: RequestHandler): AnnotatedRouter {
        throw new Error("Method not implemented.");
      }
      post(uri: string, handler: RequestHandler): AnnotatedRouter {
        throw new Error("Method not implemented.");
      }
      patch(uri: string, handler: RequestHandler): AnnotatedRouter {
        throw new Error("Method not implemented.");
      }
      delete(uri: string, handler: RequestHandler): AnnotatedRouter {
        throw new Error("Method not implemented.");
      }
      all(uri: string, handler: RequestHandler): AnnotatedRouter {
        throw new Error("Method not implemented.");
      }
      async handle(req: Request): Promise<Response> {
        return new Response(expectedBody);
      }
    }

    const response = (await container[keys.router].handle(
      new Request("http://localhost"),
    )) as Response;

    expect(response).toBeDefined();

    const body = await response.text();
    expect(body).toBe(expectedBody);
  });
});
