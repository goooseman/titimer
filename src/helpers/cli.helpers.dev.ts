// tslint:disable-next-line
import "module-alias/register";

import { getClearLineWithText } from "./cli.helpers";

process.stdout.write(getClearLineWithText("foo"));
setTimeout(() => {
  process.stdout.write(getClearLineWithText("##@#@!#@!"));
}, 1000);
