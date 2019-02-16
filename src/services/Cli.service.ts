import { EventEmitter } from "events";
// tslint:disable-next-line no-relative-imports
import * as packageJson from "../../package.json";

class CliService extends EventEmitter {
  public argumentList: string[];

  constructor(argumentList: string[]) {
    super();
    this.argumentList = argumentList;
  }

  public open() {
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
