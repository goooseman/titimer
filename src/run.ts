import { getClearLineWithText } from "@src/helpers/cli.helpers";
import { parseMsToString, parseStringToMs } from "@src/helpers/time.hepers";
import CliService from "@src/services/Cli.service";
import TimerService from "@src/services/Timer.service";

const run = (argv: string[]) => {
  const cliService = new CliService(argv, onStarted);
  cliService.on("print", (s: string) => {
    console.log(s);
  });
  cliService.start();
};

const onStarted = (argumentsList: string[]) => {
  const msToRun = parseStringToMs(argumentsList[0]);
  const timerService = new TimerService(msToRun);
  timerService.on("change", (ms: number) => {
    process.stdout.write(getClearLineWithText(parseMsToString(ms)));
  });
  timerService.on("finish", () => {
    process.stdout.write(getClearLineWithText("Finished"));
  });
  timerService.start();
};

export default run;
