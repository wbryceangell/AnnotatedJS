import { RequestHandler } from "./types";

export interface AnnotatedCache {
  has(request: Request): Promise<boolean>;
  get: RequestHandler;
  put(request: Request, response: Response): Promise<void>;
  delete(request: Request): Promise<void>;
}
