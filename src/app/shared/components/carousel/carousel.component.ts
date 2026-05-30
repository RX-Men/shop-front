import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  effect,
  input,
  OnDestroy,
  OnInit,
  signal,
  TemplateRef,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { BehaviorSubject, interval, switchMap } from 'rxjs';

import { PickerControlComponent } from './components/picker-control';

import { APP_TEST_IDS } from '@/app/app.test-ids';
import { CAROUSEL_TYPE, MIN_SWIPE_SIZE, SWIPE_DIRECTION } from './carousel.constants';

import type { CarouselType, Handlers, SwipeDirection } from './carousel.types';
import { IconButtonComponent } from '../icon-button';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-carousel',
  imports: [NgTemplateOutlet, PickerControlComponent, IconButtonComponent],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent<T extends object> implements OnInit, OnDestroy {
  readonly slideTemplate = contentChild.required(TemplateRef);
  readonly slides = input<T[]>([]);

  readonly type = input<CarouselType>(CAROUSEL_TYPE.slider);
  readonly perView = input<number>(1);
  readonly autoplay = input<number>();

  readonly hasSlideControls = input<boolean>(false);

  protected readonly _withAutoplay = computed(() => {
    const autoplay = this.autoplay();
    if (autoplay === undefined) {
      return false;
    }

    return Number.isFinite(autoplay) && autoplay > 0;
  });

  protected readonly _autoplayButton = computed<{
    icon: ReturnType<IconButtonComponent['icon']>;
    label: string;
  }>(() => {
    const isStopped = this._isAutoplayingManuallyStopped();
    return {
      icon: isStopped ? 'play-circle' : 'pause-circle',
      label: isStopped ? 'Start slide show' : 'Stop slide show',
    };
  });

  protected readonly _ariaLive = computed(() => {
    if (this.type() === 'carousel') {
      return this._isAutoplayingManuallyStopped() ? 'polite' : 'off';
    }

    return 'polite';
  });

  protected readonly _tracks = computed(() => {
    const tracks = [];
    const slides = this.slides();
    const perView = this.perView();

    for (let i = 0; i < slides.length; i += perView) {
      tracks.push(slides.slice(i, i + perView));
    }

    return tracks;
  });

  protected readonly _trackTransform = computed(() => {
    const currentIndex = this._currentIndex();
    return `translateX(calc(-100% * ${currentIndex} - ${currentIndex} * var(--spacing-x4)))`;
  });

  protected readonly _currentIndex = signal<number>(0);

  protected readonly _testIds = APP_TEST_IDS.carousel;

  private _clientX = {
    start: 0,
    end: 0,
  };

  constructor() {
    effect(() => {
      const lastTrackIndex = Math.max(this._tracks().length - 1, 0);
      const currentIndex = this._currentIndex();

      if (currentIndex <= lastTrackIndex) {
        return;
      }

      this._currentIndex.set(lastTrackIndex);
    });
  }

  ngOnInit(): void {
    if (this._withAutoplay()) {
      this._isAutoplaying.next(true);
      this._isAutoplaying
        .pipe(switchMap((isPlaying) => (isPlaying ? interval(this.autoplay()) : [])))
        .subscribe(() => {
          this.switchNextSlide();
        });
    }
  }

  ngOnDestroy(): void {
    this._isAutoplaying.unsubscribe();
  }

  readonly isFirstSlide = (): boolean => this._currentIndex() <= 0;
  readonly isLastSlide = (): boolean => this._currentIndex() >= this._tracks().length - 1;

  private readonly _isAutoplaying = new BehaviorSubject<boolean>(false);
  private readonly _isAutoplayingManuallyStopped = signal<boolean>(false);

  private readonly _nextHandlers: Handlers = {
    [CAROUSEL_TYPE.carousel]: (): void => this._switchCarouselNextSlide(),
    [CAROUSEL_TYPE.slider]: (): void => this._switchSliderNextSlide(),
  };

  private readonly _prevHandlers = {
    [CAROUSEL_TYPE.carousel]: (): void => this._switchCarouselPreviousSlide(),
    [CAROUSEL_TYPE.slider]: (): void => this._switchSliderPreviousSlide(),
  };

  readonly switchNextSlide = (): void => {
    this._nextHandlers[this.type()]();
  };

  readonly switchPreviousSlide = (): void => {
    this._prevHandlers[this.type()]();
  };

  protected readonly _handleMouseEnter = (): void => {
    this._stopAutoplay();
  };

  protected readonly _handleMouseLeave = (): void => {
    if (this._isAutoplayingManuallyStopped()) {
      return;
    }

    this._resumeAutoplay();
  };

  protected readonly _handleTouchStart = (event: TouchEvent): void => {
    const [touch] = event.touches;
    this._clientX = {
      start: Math.round(touch.clientX),
      end: 0,
    };
  };

  protected readonly _handleTouchEnd = (event: TouchEvent): void => {
    const [touch] = event.changedTouches;
    this._clientX = {
      ...this._clientX,
      end: Math.round(touch.clientX),
    };

    const move = this._clientX.end - this._clientX.start;
    const isSwipe = Math.abs(move) >= MIN_SWIPE_SIZE;

    if (!isSwipe) {
      return;
    }

    const direction: SwipeDirection = move >= 0 ? SWIPE_DIRECTION.start : SWIPE_DIRECTION.end;
    switch (direction) {
      case SWIPE_DIRECTION.start:
        this.switchPreviousSlide();
        break;
      case SWIPE_DIRECTION.end:
        this.switchNextSlide();
        break;
    }
  };

  protected readonly _handlePickerControl = (index: number): void => {
    this._currentIndex.set(index);
  };

  protected readonly _toggleAutoplayButton = (): void => {
    this._isAutoplayingManuallyStopped.update((isPlaying) => !isPlaying);

    if (this._isAutoplayingManuallyStopped()) {
      this._stopAutoplay();
    } else {
      this._resumeAutoplay();
    }
  };

  protected readonly _stopAutoplayOnFocus = (): void => {
    if (this._isAutoplayingManuallyStopped()) {
      return;
    }

    this._toggleAutoplayButton();
  };

  private readonly _switchSliderNextSlide = (): void => {
    if (this.isLastSlide()) {
      return;
    }

    this._currentIndex.update((index) => index + 1);
  };

  private readonly _switchSliderPreviousSlide = (): void => {
    if (this.isFirstSlide()) {
      return;
    }

    this._currentIndex.update((index) => index - 1);
  };

  private readonly _switchCarouselNextSlide = (): void => {
    const isLastSlide = this.isLastSlide();

    this._currentIndex.update((index) => (isLastSlide ? 0 : index + 1));
  };

  private readonly _switchCarouselPreviousSlide = (): void => {
    const lastSlideIndex = this._tracks().length - 1;
    const isFirstSlide = this.isFirstSlide();

    this._currentIndex.update((index) => (isFirstSlide ? lastSlideIndex : index - 1));
  };

  private readonly _resumeAutoplay = (): void => {
    this._isAutoplaying.next(true);
  };

  private readonly _stopAutoplay = (): void => {
    this._isAutoplaying.next(false);
  };
}
