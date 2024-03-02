import { itExpectsAValidContainer } from "./utils/classDecorators";
import { Datastore } from "../../src/decorators/datastore/datastore";

describe("@Datastore", () => {
  itExpectsAValidContainer(Datastore);
});
