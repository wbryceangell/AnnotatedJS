import { RequestScope } from "../../src/decorators/config/requestScope";
import { itExpectsAValidContainer } from "./utils/classDecorators";

describe("@RequestScope", () => {
  itExpectsAValidContainer(RequestScope);
});
