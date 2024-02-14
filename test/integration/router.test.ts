/* eslint-disable @typescript-eslint/no-unused-vars */

import { AnnotatedRouter, Router } from "../../src";
import { keys } from "../../src/container/keys";
import { RequestHandler } from "../../src/interfaces/types";

describe("Router", () => {
  it("should work when it is used on a class", () => {
    expect(() => {
      // @ts-expect-error testing invalid router implementation
      @Router({})
      class TestRouter {}
    }).not.toThrow();
  });

  it("handles a request", async () => {
    const expectedBody = "body";
    const container: { Router?: TestRouter } = {};

    @Router(container)
    class TestRouter implements AnnotatedRouter {
      get(_uri: string, _handler: RequestHandler): AnnotatedRouter {
        throw new Error("Method not implemented.");
      }
      put(_uri: string, _handler: RequestHandler): AnnotatedRouter {
        throw new Error("Method not implemented.");
      }
      post(_uri: string, _handler: RequestHandler): AnnotatedRouter {
        throw new Error("Method not implemented.");
      }
      patch(_uri: string, _handler: RequestHandler): AnnotatedRouter {
        throw new Error("Method not implemented.");
      }
      delete(_uri: string, _handler: RequestHandler): AnnotatedRouter {
        throw new Error("Method not implemented.");
      }
      all(_uri: string, _handler: RequestHandler): AnnotatedRouter {
        throw new Error("Method not implemented.");
      }
      async handle(_req: Request): Promise<Response> {
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
