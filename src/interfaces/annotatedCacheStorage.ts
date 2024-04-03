import { AnnotatedCache } from "./annotatedCache";

/**
 * @see
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage | MDN} for spec
 */
export interface AnnotatedCacheStorage {
  has(cacheName: string): Promise<boolean>;
  open(cacheName: string): Promise<AnnotatedCache>;
  delete(cacheName: string): Promise<boolean>;
}
