import { Awaitable, RouteContext } from "@worker-tools/router";
import { Controller } from "../decorators/class/controller";
import { Cache } from "../decorators/method/cache";
import { Get } from "../decorators/method/http/methods/get";

@Controller("/test")
class GetTest {
  @Get("/get")
  @Cache("getTest")
  test(req: Request, ctx: RouteContext): Awaitable<Response> {
    return new Response("Hey there");
  }
}
