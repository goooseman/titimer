import { parseMsToString, parseStringToMs } from "@src/helpers/time.hepers";
import CliService from "@src/services/Cli.service";
import TimerService from "@src/services/Timer.service";

const run = (argv: string[]) => {
  const onStarted = (argumentsList: string[]) => {
    const msToRun = parseStringToMs(argumentsList[0]);
    const timerService = new TimerService(msToRun);
    timerService.on("change", (ms: number) => {
      console.log(parseMsToString(ms));
    });
    timerService.on("finish", () => {
      console.log("Finished");
    });
    timerService.start();
  };

  const cliService = new CliService(argv, onStarted);
  cliService.on("print", (s: string) => {
    console.log(s);
  });
  cliService.start();
};

export default run;
