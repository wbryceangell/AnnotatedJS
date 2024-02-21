import { Cache } from "./cache";

/**
 * @see
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage | MDN} for spec
 */
export interface AnnotatedCacheStorage {
  has(cacheName: string): Promise<boolean>;
  open(cacheName: string): Promise<Cache>;
  delete(cacheName: string): Promise<boolean>;
}
