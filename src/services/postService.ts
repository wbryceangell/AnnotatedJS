import { Service } from "../decorators/class/service";

@Service
export class PostService {
  echo(message: string) {
    return message;
  }
}
