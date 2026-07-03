export const shuffle = <T>(array: T[]): T[] => {
  const copy = structuredClone(array);

  for (let i = 0; i < copy.length; i += 1) {
    const index = Math.floor(Math.random() * (i + 1));

    const temporary = copy[i];
    copy[i] = copy[index] as T;
    copy[index] = temporary as T;
  }

  return copy;
};
