import { Controller } from "../decorators/class/controller";
import { Post } from "../decorators/method/post";

@Controller("/test")
class PostTest {
  @Post("/post")
  test(req: Request) {
    return new Response(req.body);
  }
}
