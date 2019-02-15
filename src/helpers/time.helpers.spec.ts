import {
  MultipleTimeBlocks,
  parseMsToString,
  parseStringToMs,
} from "./time.hepers";

describe("parseStringToMs", () => {
  it("should parse 60s as 60 * 1000", () => {
    expect(parseStringToMs("60s")).toBe(60 * 1000);
  });

  it("should parse 60m as 60 * 60 * 1000", () => {
    expect(parseStringToMs("60m")).toBe(60 * 60 * 1000);
  });

  it("should parse 123m as 123 * 60 * 1000", () => {
    expect(parseStringToMs("123m")).toBe(123 * 60 * 1000);
  });

  it("should parse 2h as 2 * 60 * 60 * 1000", () => {
    expect(parseStringToMs("2h")).toBe(2 * 60 * 60 * 1000);
  });
  it("should parse 2m30s as (2 * 60 + 30) * 1000", () => {
    expect(parseStringToMs("2m30s")).toBe((2 * 60 + 30) * 1000);
  });
  it("should parse 1h42m45s as ((1 * 60 * 60) + (42 * 60) + 45) * 1000", () => {
    expect(parseStringToMs("1h42m45s")).toBe(
      (1 * 60 * 60 + 42 * 60 + 45) * 1000,
    );
  });

  it("should not parse 1h12m1h and fail with MultipleTimeBlocks exception", () => {
    expect(() => parseStringToMs("1h12m1h")).toThrowError(MultipleTimeBlocks);
  });
});

describe("parseMsToString", () => {
  it("should parse 60 * 1000 to '60 seconds'", () => {
    expect(parseMsToString(60 * 1000)).toBe("60 seconds");
  });
});
