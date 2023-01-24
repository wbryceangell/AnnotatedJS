import { Awaitable, RouteContext } from "@worker-tools/router";
import { Controller } from "../decorators/class/controller";
import { Get } from "../decorators/method/get";

@Controller("/test")
class GetTest {
  @Get("/get")
  test(req: Request, ctx: RouteContext): Awaitable<Response> {
    return new Response("Hey there");
  }
}
