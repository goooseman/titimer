import { MultipleTimeBlocks, parseStringToSeconds } from "./time.hepers";

describe("parseStringToSeconds", () => {
  it("should parse 60s as 60 * 1000", () => {
    expect(parseStringToSeconds("60s")).toBe(60 * 1000);
  });

  it("should parse 60m as 60 * 60 * 1000", () => {
    expect(parseStringToSeconds("60m")).toBe(60 * 60 * 1000);
  });

  it("should parse 123m as 123 * 60 * 1000", () => {
    expect(parseStringToSeconds("123m")).toBe(123 * 60 * 1000);
  });

  it("should parse 2h as 2 * 60 * 60 * 1000", () => {
    expect(parseStringToSeconds("2h")).toBe(2 * 60 * 60 * 1000);
  });
  it("should parse 2m30s as (2 * 60 + 30) * 1000", () => {
    expect(parseStringToSeconds("2m30s")).toBe((2 * 60 + 30) * 1000);
  });
  it("should parse 1h42m45s as ((1 * 60 * 60) + (42 * 60) + 45) * 1000", () => {
    expect(parseStringToSeconds("1h42m45s")).toBe(
      (1 * 60 * 60 + 42 * 60 + 45) * 1000,
    );
  });

  it("should not parse 1h12m1h and fail with MultipleTimeBlocks exception", () => {
    expect(() => parseStringToSeconds("1h12m1h")).toThrowError(
      MultipleTimeBlocks,
    );
  });
});
