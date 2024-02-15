export interface Cache {
  match(request: Request): Promise<Response | undefined>;
  put(request: Request, response: Response): Promise<undefined>;
  delete(request: Request): Promise<boolean>;
}
