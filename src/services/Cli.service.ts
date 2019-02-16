import { EventEmitter } from "events";
// tslint:disable-next-line no-relative-imports
import * as packageJson from "../../package.json";

class CliService extends EventEmitter {
  public argumentList: string[];
  public onStarted: (argumentList: string[]) => void;

  constructor(
    argumentList: string[],
    onStarted: (argumentList: string[]) => void,
  ) {
    super();
    this.argumentList = argumentList;
    this.onStarted = onStarted;
  }

  public start() {
    this.parseCommand();
  }

  private parseCommand() {
    const firstArgument = this.argumentList[0];
    const commands: { [command: string]: () => void } = {
      "-v": this.printVersion,
      "--version": this.printVersion,
      "-h": this.printHelp,
      "--help": this.printHelp,
    };
    if (!firstArgument) {
      this.printHelp();
      return;
    }
    if (commands[firstArgument]) {
      commands[firstArgument]();
      return;
    }
    this.onStarted(this.argumentList);
  }

  private printVersion = () => {
    this.emit("print", `Version ${packageJson.version}`);
  };

  private printHelp = () => {
    const text = `Usage: titimer 1h2m30s`;
    this.emit("print", text);
  };
}

export default CliService;
