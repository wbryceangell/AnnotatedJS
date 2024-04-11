import { RequestScope } from "../../src/decorators/config/requestScope";
import {
  itExpectsAValidContainer,
  itThrowsErrorIfNotUsedOnAClass,
} from "./utils/classDecorators";

describe("@RequestScope", () => {
  itExpectsAValidContainer(RequestScope);
  itThrowsErrorIfNotUsedOnAClass(RequestScope);
});
