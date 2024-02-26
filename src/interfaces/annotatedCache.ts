/**
 * @see
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Cache | MDN} for spec
 *
 * {@link AnnotatedCacheStorage.open} for usage
 */
export interface AnnotatedCache {
  match(request: Request): Promise<Response | undefined>;
  put(request: Request, response: Response): Promise<undefined>;
  delete(request: Request): Promise<boolean>;
}
