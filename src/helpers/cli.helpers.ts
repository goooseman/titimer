import { CLEAR_LINE, MOVE_LEFT } from "@src/constants/cli.constants";

export const getClearLineWithText = (s: string) =>
  `${MOVE_LEFT}${CLEAR_LINE}${s}`;
