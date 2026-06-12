import type { BreakpointState } from '@angular/cdk/layout';

import { BREAKPOINTS, type BreakpointValue } from '@/app/shared/constants/breakpoints';

const DEFAULT_CARDS_COUNT = 5;
const CARDS_COUNT_BY_SCREEN_SIZE: Partial<Record<BreakpointValue, number>> = {
  [BREAKPOINTS.xl]: 4,
  [BREAKPOINTS.m]: 3,
  [BREAKPOINTS.s]: 2,
} as const;

export const SCREEN_SIZE_ORDER_ASC = [BREAKPOINTS.s, BREAKPOINTS.m, BREAKPOINTS.xl];

export const getCardsCountByScreenSize = (breakpoints: BreakpointState['breakpoints']): number => {
  const activeBreakpoint = SCREEN_SIZE_ORDER_ASC.find((breakpoint) => breakpoints[breakpoint]);
  const count = activeBreakpoint ? CARDS_COUNT_BY_SCREEN_SIZE[activeBreakpoint] : undefined;

  return count ?? DEFAULT_CARDS_COUNT;
};
