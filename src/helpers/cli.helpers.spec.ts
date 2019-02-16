import { CLEAR_LINE, MOVE_LEFT } from "@src/constants/cli.constants";
import { getClearLineWithText } from "./cli.helpers";

jest.mock("@src/constants/cli.constants");

it("should print MOVE_LEFT + CLEAR_LINE + str", () => {
  expect(getClearLineWithText("test")).toBe(`${MOVE_LEFT}${CLEAR_LINE}test`);
});
