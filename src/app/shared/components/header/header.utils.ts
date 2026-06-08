import type { IconName } from '../icon/icon.types';

interface SearchToggleButtonData {
  openLabel: string;
  closeLabel: string;
}

export const getSearchWidgetData = (
  isSearchWidgetOpen: boolean,
  toggleButton: SearchToggleButtonData,
): { icon: IconName; label: string } => ({
  icon: isSearchWidgetOpen ? 'close' : 'search',
  label: isSearchWidgetOpen ? toggleButton.closeLabel : toggleButton.openLabel,
});
