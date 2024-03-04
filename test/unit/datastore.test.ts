import {
  itExpectsAValidContainer,
  itThrowsErrorIfNotUsedOnAClass,
  itThrowsWhenUsedOnAnUnnamedClass,
} from "./utils/classDecorators";
import { Datastore } from "../../src/decorators/datastore/datastore";

describe("@Datastore", () => {
  itExpectsAValidContainer(Datastore);
  itThrowsErrorIfNotUsedOnAClass(Datastore);
  itThrowsWhenUsedOnAnUnnamedClass(Datastore);
});
