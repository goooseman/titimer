import { TIME_FORMAT_EXAMPLE } from "@src/constants/cli.constants";
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
  let timerService;
  try {
    timerService = new TimerService(msToRun);
  } catch (e) {
    if ((e as Error).constructor.name === "ZeroTimerError") {
      console.error(
        `Please, provide a string in a format ${TIME_FORMAT_EXAMPLE}`,
      );
      return;
    }
    throw e;
  }

  timerService.on("change", (ms: number) => {
    process.stdout.write(getClearLineWithText(parseMsToString(ms)));
  });
  timerService.on("finish", () => {
    process.stdout.write(getClearLineWithText("Finished"));
  });
  timerService.start();
};

export default run;
