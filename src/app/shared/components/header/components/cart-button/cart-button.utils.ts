export const getBadgeContent = (count?: number): string | undefined => {
  if (!count) {
    return;
  }

  if (count > 9) {
    return '9+';
  }

  return String(count);
};
