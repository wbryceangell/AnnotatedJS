import { Awaitable, RouteContext } from "@worker-tools/router";
import { Controller } from "../decorators/class/controller";
import { Post } from "../decorators/method/post";
import { Inject } from "../decorators/property/inject";
import { PostService } from "../services/postService";

@Controller("/test")
class PostTest {
  @Inject(PostService)
  service!: PostService;

  @Post("/post")
  test(req: Request, ctx: RouteContext): Awaitable<Response> {
    return req.text().then((text) => {
      const echoText = this.service.echo(text);
      return new Response(echoText);
    });
  }
}
