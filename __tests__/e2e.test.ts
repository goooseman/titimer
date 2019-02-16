import { CLEAR_LINE, MOVE_LEFT } from "@src/constants/cli.constants";
import run from "@src/run";
import { ZeroTimerError } from "@src/services/Timer.service";

// tslint:disable-next-line no-relative-imports
import { version } from "../package.json";

jest.useFakeTimers();
jest.mock("@src/constants/cli.constants");

expect.extend({
  toPrintInSameLine: (recieved: string, s: string) => {
    const correctString = `${MOVE_LEFT}${CLEAR_LINE}${s}`;
    const isPassed = recieved === correctString;
    if (isPassed) {
      return {
        message: () => `expected ${recieved} not to be ${correctString}`,
        pass: true,
      };
    }
    return {
      message: () => `expected ${recieved} to be ${correctString}`,
      pass: false,
    };
  },
});

declare global {
  namespace jest {
    interface Matchers<R> {
      toPrintInSameLine(s: string): CustomMatcherResult;
    }
    interface Expect {
      toPrintInSameLine(s: string): CustomMatcherResult;
    }
  }
}

const createStdoutSpy = () => {
  const spy = jest.fn();
  jest.spyOn(process.stdout, "write").mockImplementation(spy);
  return spy;
};

const createConsoleSpy = () => {
  const spy = jest.fn();
  jest.spyOn(console, "log").mockImplementation(spy);
  return spy;
};

test("Should run for 3 seconds when 3s passed", () => {
  const stdoutSpy = createStdoutSpy();
  run(["3s"]);
  for (let i = 3; i >= 1; i--) {
    expect(stdoutSpy).toHaveBeenLastCalledWith(
      expect.toPrintInSameLine(`${i} seconds`),
    );
    jest.advanceTimersByTime(1000);
  }
  expect(stdoutSpy).toHaveBeenLastCalledWith(
    expect.toPrintInSameLine(`Finished`),
  );
});

test("Should run for 1 minute 5 seconds when 1m3s passed", () => {
  const stdoutSpy = createStdoutSpy();
  run(["1m3s"]);
  for (let i = 63; i >= 1; i--) {
    expect(stdoutSpy).toHaveBeenLastCalledWith(
      expect.toPrintInSameLine(`${i} seconds`),
    );
    jest.advanceTimersByTime(1000);
  }
  expect(stdoutSpy).toHaveBeenLastCalledWith(
    expect.toPrintInSameLine(`Finished`),
  );
});

test("Should should show version if -v is passed", () => {
  const consoleSpy = createConsoleSpy();
  run(["-v"]);
  expect(consoleSpy).toHaveBeenLastCalledWith(`Version ${version}`);
});

test("Should should show help if nothing is passed", () => {
  const consoleSpy = createConsoleSpy();
  run([]);
  expect(consoleSpy).toHaveBeenLastCalledWith(expect.stringMatching(/Usage/));
});

test("Should fail on illegal string", () => {
  expect(() => {
    run(["fdfddfd"]);
  }).toThrowError(ZeroTimerError);
});
