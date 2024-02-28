import { Purge } from "../../src/decorators/controller/purge/purge";
import {
  itThrowsErrorWhenCacheNameIsAnEmptyString,
  itThrowsErrorWhenCacheNameIsNotAString,
  itThrowsErrorWhenMethodMetadataIsMissing,
} from "./utils/cacheMethods";
import { itThrowsErrorIfNotAClassMethod } from "./utils/methodDecorators";

describe("@Purge", () => {
  const name = "Purge";

  itThrowsErrorIfNotAClassMethod(Purge("cacheName"));
  itThrowsErrorWhenCacheNameIsNotAString(name, Purge);
  itThrowsErrorWhenCacheNameIsAnEmptyString(name, Purge);
  itThrowsErrorWhenMethodMetadataIsMissing(name, Purge);
});
