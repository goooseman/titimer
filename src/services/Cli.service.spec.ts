// tslint:disable-next-line no-relative-imports
import * as packageJson from "../../package.json";
import CliService from "./Cli.service";

jest.useFakeTimers();

it("should show version, if -v flag was passed", async () => {
  const service = new CliService(["-v"]);
  const printSpy = jest.fn();
  service.on("print", printSpy);
  service.open();
  expect(printSpy).toHaveBeenCalledTimes(1);
  expect(printSpy).toHaveBeenLastCalledWith(`Version ${packageJson.version}`);
});

it("should show version, if --version flag was passed", async () => {
  const service = new CliService(["--version"]);
  const printSpy = jest.fn();
  service.on("print", printSpy);
  service.open();
  expect(printSpy).toHaveBeenCalledTimes(1);
  expect(printSpy).toHaveBeenLastCalledWith(`Version ${packageJson.version}`);
});

it("should show help, if --help flag was passed", async () => {
  const service = new CliService(["--help"]);
  const printSpy = jest.fn();
  service.on("print", printSpy);
  service.open();
  expect(printSpy).toHaveBeenCalledTimes(1);
  expect(printSpy).toHaveBeenLastCalledWith(expect.stringMatching("Usage:"));
});

it("should show help, if -h flag was passed", async () => {
  const service = new CliService(["-h"]);
  const printSpy = jest.fn();
  service.on("print", printSpy);
  service.open();
  expect(printSpy).toHaveBeenCalledTimes(1);
  expect(printSpy).toHaveBeenLastCalledWith(expect.stringMatching("Usage:"));
});

it("should show help, if no flag was passed", async () => {
  const service = new CliService([]);
  const printSpy = jest.fn();
  service.on("print", printSpy);
  service.open();
  expect(printSpy).toHaveBeenCalledTimes(1);
  expect(printSpy).toHaveBeenLastCalledWith(expect.stringMatching("Usage:"));
});
