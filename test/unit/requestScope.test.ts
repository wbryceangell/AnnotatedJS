import { keys } from "../../src/container/keys";
import { RequestScope } from "../../src/decorators/config/requestScope";
import {
  itExpectsAValidContainer,
  itThrowsErrorIfNotUsedOnAClass,
  itThrowsWhenUsedOnAnUnnamedClass,
} from "./utils/classDecorators";

describe("@RequestScope", () => {
  itExpectsAValidContainer(RequestScope);
  itThrowsErrorIfNotUsedOnAClass(RequestScope);
  itThrowsWhenUsedOnAnUnnamedClass(RequestScope);

  it("throws error when class is not a config class in the container", () => {
    class Config {}
    class OtherClass {}

    expect(() =>
      RequestScope({ [keys.configClasses]: [Config] })(
        OtherClass,
        // @ts-expect-error not a complete class decorator context
        {
          kind: "class",
          name: OtherClass.name,
        },
      ),
    ).toThrow();
  });
});
