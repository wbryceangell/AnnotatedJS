import { Purge } from "../../src/decorators/controller/purge/purge";
import { itThrowsErrorIfNotAClassMethod } from "./utils/methodDecorators";

describe("@Purge", () => {
  itThrowsErrorIfNotAClassMethod(Purge());
});
