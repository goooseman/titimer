// tslint:disable-next-line no-relative-imports
import * as packageJson from "../../package.json";
import CliService from "./Cli.service";

jest.useFakeTimers();

it("should show version, if -v flag was passed", async () => {
  const onStartedSpy = jest.fn();
  const service = new CliService(["-v"], onStartedSpy);
  const printSpy = jest.fn();
  service.on("print", printSpy);
  service.close();
  expect(printSpy).toHaveBeenCalledTimes(1);
  expect(printSpy).toHaveBeenLastCalledWith(`Version ${packageJson.version}`);
  expect(onStartedSpy).toHaveBeenCalledTimes(0);
});

it("should show version, if --version flag was passed", async () => {
  const onStartedSpy = jest.fn();
  const service = new CliService(["--version"], onStartedSpy);
  const printSpy = jest.fn();
  service.on("print", printSpy);
  service.close();
  expect(printSpy).toHaveBeenCalledTimes(1);
  expect(printSpy).toHaveBeenLastCalledWith(`Version ${packageJson.version}`);
  expect(onStartedSpy).toHaveBeenCalledTimes(0);
});

it("should show help, if --help flag was passed", async () => {
  const onStartedSpy = jest.fn();
  const service = new CliService(["--help"], onStartedSpy);
  const printSpy = jest.fn();
  service.on("print", printSpy);
  service.close();
  expect(printSpy).toHaveBeenCalledTimes(1);
  expect(printSpy).toHaveBeenLastCalledWith(expect.stringMatching("Usage:"));
  expect(onStartedSpy).toHaveBeenCalledTimes(0);
});

it("should show help, if -h flag was passed", async () => {
  const onStartedSpy = jest.fn();
  const service = new CliService(["-h"], onStartedSpy);
  const printSpy = jest.fn();
  service.on("print", printSpy);
  service.close();
  expect(printSpy).toHaveBeenCalledTimes(1);
  expect(printSpy).toHaveBeenLastCalledWith(expect.stringMatching("Usage:"));
  expect(onStartedSpy).toHaveBeenCalledTimes(0);
});

it("should show help, if no flag was passed", async () => {
  const onStartedSpy = jest.fn();
  const service = new CliService([], onStartedSpy);
  const printSpy = jest.fn();
  service.on("print", printSpy);
  service.close();
  expect(printSpy).toHaveBeenCalledTimes(1);
  expect(printSpy).toHaveBeenLastCalledWith(expect.stringMatching("Usage:"));
  expect(onStartedSpy).toHaveBeenCalledTimes(0);
});

it("should start onStarted function if other arguments are passed", () => {
  const onStartedSpy = jest.fn();
  const service = new CliService(["foo"], onStartedSpy);
  service.close();
  expect(onStartedSpy).toHaveBeenCalledTimes(1);
  expect(onStartedSpy).toHaveBeenLastCalledWith(["foo"]);
});
