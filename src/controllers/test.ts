import { Controller } from "../decorators/class/controller";
import { Get } from "../decorators/method/get";

@Controller("/test")
class Test {
  @Get
  getTest() {
    return new Response("Hey there");
  }
}
