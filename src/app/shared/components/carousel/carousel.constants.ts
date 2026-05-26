const CAROUSEL_TYPE = {
  slider: 'slider',
  carousel: 'carousel',
} as const;

const SWIPE_DIRECTION = {
  start: 'start',
  end: 'end',
} as const;

const MIN_SWIPE_SIZE = 50;

export { CAROUSEL_TYPE, SWIPE_DIRECTION, MIN_SWIPE_SIZE };
