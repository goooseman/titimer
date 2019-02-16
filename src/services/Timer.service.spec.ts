import TimerService from "./Timer.service";

jest.useFakeTimers();

it("should fire a change event every 1 second", () => {
  const changeSpy = jest.fn();
  const service = new TimerService(3000);
  service.on("change", changeSpy);
  service.start();
  expect(changeSpy).toHaveBeenCalledTimes(1);
  expect(changeSpy).toHaveBeenLastCalledWith(3000);
  jest.advanceTimersByTime(1000);
  expect(changeSpy).toHaveBeenCalledTimes(2);
  expect(changeSpy).toHaveBeenLastCalledWith(2000);
  jest.advanceTimersByTime(1000);
  expect(changeSpy).toHaveBeenCalledTimes(3);
  expect(changeSpy).toHaveBeenLastCalledWith(1000);
});

it("should fire a finish event after timer runout", () => {
  const service = new TimerService(3000);
  const finishSpy = jest.fn();
  service.on("finish", finishSpy);
  service.start();
  jest.advanceTimersByTime(2500);
  expect(finishSpy).toHaveBeenCalledTimes(0);
  jest.advanceTimersByTime(500);
  expect(finishSpy).toHaveBeenCalledTimes(1);
  expect(finishSpy).toHaveBeenLastCalledWith();
});

afterAll(() => {
  jest.clearAllTimers();
});
