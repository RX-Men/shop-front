import { CAROUSEL_TYPE, SWIPE_DIRECTION } from './carousel.constants';

type CarouselType = (typeof CAROUSEL_TYPE)[keyof typeof CAROUSEL_TYPE];
type SwipeDirection = (typeof SWIPE_DIRECTION)[keyof typeof SWIPE_DIRECTION];

type Handlers = Record<CarouselType, () => void>;

export type { CarouselType, SwipeDirection, Handlers };
