interface Skeleton {
  label: string;
  value: string;
  items: {
    label: string;
    value: string;
  }[];
}

export const generateCheckboxGroupSkeleton = (
  groupCount: number,
  itemCount: number,
): Skeleton[] => {
  return Array.from({ length: groupCount }, (_, groupIndex) => {
    return {
      label: `Checkbox group ${groupIndex}`,
      value: String(groupIndex),
      items: Array.from({ length: itemCount }, (__, itemIndex) => ({
        label: `Checkbox ${itemIndex}`,
        value: String(itemIndex),
      })),
    };
  });
};
