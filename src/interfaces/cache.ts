import { RequestHandler } from "./types";

export interface Cache {
  get: RequestHandler;
  put(request: Request, response: Response): Promise<void>;
  delete(request: Request): Promise<void>;
}
