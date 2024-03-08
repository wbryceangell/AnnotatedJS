export interface AnnotatedDatastore<T> {
  length: number;
  clear(): Promise<undefined>;
  getItem(keyName: string): Promise<T | null>;
  key(index: number): Promise<T | null>;
  removeItem(keyName: string): Promise<undefined>;
  setItem(keyName: string, value: T): Promise<undefined>;
}
