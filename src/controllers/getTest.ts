import { Controller } from "../decorators/class/controller";
import { Get } from "../decorators/method/get";

@Controller("/test")
class GetTest {
  @Get("/get")
  test() {
    return new Response("Hey there");
  }
}
