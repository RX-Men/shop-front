import { icons } from './icon.constants';

type IconName = (typeof icons)[keyof typeof icons];
type IconSize = 'xl' | 'l' | 'm' | 's' | 'auto';

export type { IconName, IconSize };
