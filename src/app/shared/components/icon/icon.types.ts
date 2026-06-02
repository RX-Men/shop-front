import { ICON_NAME, ICON_SIZE } from './icon.constants';

type IconName = (typeof ICON_NAME)[keyof typeof ICON_NAME];
type IconSize = (typeof ICON_SIZE)[keyof typeof ICON_SIZE];

export type { IconName, IconSize };
