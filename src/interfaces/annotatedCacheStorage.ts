import { Cache } from "./cache";

export interface AnnotatedCacheStorage {
  has(cacheName: string): Promise<boolean>;
  open(cacheName: string): Promise<Cache>;
  delete(cacheName: string): Promise<boolean>;
}
