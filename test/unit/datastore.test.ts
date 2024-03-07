import {
  itAddsClassToArrayInContainer,
  itCreatesClassInstanceInInitHook,
  itExpectsAValidContainer,
  itHasInitializationHook,
  itThrowsErrorIfNotUsedOnAClass,
  itThrowsWhenUsedOnAnUnnamedClass,
} from "./utils/classDecorators";
import { Datastore } from "../../src/decorators/datastore/datastore";
import { keys } from "../../src/container/keys";

describe("@Datastore", () => {
  itExpectsAValidContainer(Datastore);
  itThrowsErrorIfNotUsedOnAClass(Datastore);
  itThrowsWhenUsedOnAnUnnamedClass(Datastore);
  itAddsClassToArrayInContainer(Datastore, keys.datastoreClasses);
  itHasInitializationHook(Datastore);
  itCreatesClassInstanceInInitHook(Datastore);
});
