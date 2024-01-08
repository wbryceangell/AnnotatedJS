import { Inject, Service } from "@src";

@Service
export class StorageService {
  @Inject(Symbol.for("Storage"))
  private storage!: Map<string, string>;

  create(key: string, value: any) {
    this.storage.set(key, JSON.stringify(value));
  }

  read(key: string) {
    const value = this.storage.get(key);
    if (!value) throw new Error(`no value for ${key} in storage`);
    return JSON.parse(value);
  }

  update(key: string, value: any) {
    this.storage.set(key, JSON.stringify(value));
  }

  delete(key: string) {
    this.storage.delete(key);
  }
}
