import { DRAWER_KEY } from './ui.service.constants';

type DrawerKey = (typeof DRAWER_KEY)[keyof typeof DRAWER_KEY];

export type { DrawerKey };
