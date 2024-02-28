import { Purge } from "../../src/decorators/controller/purge/purge";
import {
  itThrowsErrorWhenCacheNameIsAnEmptyString,
  itThrowsErrorWhenCacheNameIsNotAString,
} from "./utils/cacheMethods";
import { itThrowsErrorIfNotAClassMethod } from "./utils/methodDecorators";

describe("@Purge", () => {
  const name = "Purge";
  const cacheName = "cacheName";

  itThrowsErrorIfNotAClassMethod(Purge(cacheName));
  itThrowsErrorWhenCacheNameIsNotAString(name, Purge);
  itThrowsErrorWhenCacheNameIsAnEmptyString(name, Purge);
});
