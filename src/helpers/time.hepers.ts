const timeUnits: {
  s: number;
  m: number;
  h: number;
} = {
  s: 1000,
  m: 60 * 1000,
  h: 60 * 60 * 1000,
};

export class MultipleTimeBlocks extends Error {}

const getNumberBeforeString = (
  originalString: string,
  searchString: string,
) => {
  const regex = new RegExp(`(\\d+)${searchString}`, "g");
  const match = originalString.match(regex);
  if (!match) {
    return undefined;
  }
  if (match.length > 1) {
    throw new MultipleTimeBlocks();
  }
  return parseInt(match[0]);
};

export const parseStringToMs = (timeString: string): number => {
  let seconds = 0;
  for (const [key, entry] of Object.entries(timeUnits)) {
    const count = getNumberBeforeString(timeString, key);
    if (!count) {
      continue;
    }
    seconds += count * entry;
  }
  return seconds;
};

export const parseMsToString = (ms: number) => `${ms / 1000} seconds`;
