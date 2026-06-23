import type { Option } from './select.types';

const getFirstSelectedOption = (
  options: Option[],
  selectedOptionValues: string[],
): Option | undefined => options.find((option) => option.value === selectedOptionValues.at(0));

const getPlaceholder = (
  options: Option[],
  selectedOptionValues: string[],
  placeholder = '',
): string => {
  const selectedCount = selectedOptionValues.length;

  if (selectedCount <= 0) {
    return placeholder;
  }

  const firstSelectedOption = getFirstSelectedOption(options, selectedOptionValues);

  if (!firstSelectedOption) {
    return `Selected: ${String(selectedCount)}`;
  }

  const restSelectedCount = selectedCount - 1;

  return `${firstSelectedOption.text}${restSelectedCount > 0 ? ` +${String(restSelectedCount)}` : ''}`;
};

export { getPlaceholder };
