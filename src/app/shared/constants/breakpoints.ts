const BREAKPOINTS = {
  xxl: '(max-width: 1399px)',
  xl: '(max-width: 1199px)',
  l: '(max-width: 991px)',
  m: '(max-width: 767px)',
  s: '(max-width: 575px)',
} as const;

type BreakpointKey = keyof typeof BREAKPOINTS;
type BreakpointValue = (typeof BREAKPOINTS)[BreakpointKey];

export { BREAKPOINTS, type BreakpointKey, type BreakpointValue };
