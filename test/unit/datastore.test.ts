import {
  itAddsClassToArrayInContainer,
  itExpectsAValidContainer,
  itThrowsErrorIfNotUsedOnAClass,
  itThrowsWhenUsedOnAnUnnamedClass,
} from "./utils/classDecorators";
import { Datastore } from "../../src/decorators/datastore/datastore";
import { keys } from "../../src/container/keys";

describe("@Datastore", () => {
  const name = "Datastore";

  itExpectsAValidContainer(Datastore);
  itThrowsErrorIfNotUsedOnAClass(Datastore);
  itThrowsWhenUsedOnAnUnnamedClass(Datastore);
  itAddsClassToArrayInContainer(name, Datastore, keys.datastoreClasses);
});
