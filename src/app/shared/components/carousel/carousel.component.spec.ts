import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselComponent } from './carousel.component';

import { APP_TEST_IDS } from '@/app/app.test-ids';

import type { CarouselType } from './carousel.types';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CarouselComponent],
  template: `
    <app-carousel [type]="type()" [slides]="slides()" [perView]="perView()">
      <ng-template let-slide>
        <span class="slide-content">{{ slide.title }}</span>
      </ng-template>
    </app-carousel>
  `,
})
class TestHostComponent {
  readonly slides = signal([{ title: 'Slide 1' }, { title: 'Slide 2' }, { title: 'Slide 3' }]);
  readonly type = signal<CarouselType>('slider');
  readonly perView = signal(1);

  readonly _carouselEl = viewChild.required(CarouselComponent);

  readonly switchNext = (): void => this._carouselEl().switchNextSlide();
  readonly switchPrevious = (): void => this._carouselEl().switchPreviousSlide();
}

describe('CarouselComponent', () => {
  let component: TestHostComponent;
  let componentElement: HTMLElement | null;
  let fixture: ComponentFixture<TestHostComponent>;

  const dispatchTouchEvent = (
    element: HTMLElement,
    eventName: 'touchstart' | 'touchend',
    clientX: number,
  ): void => {
    const event = new Event(eventName);

    Object.defineProperty(event, eventName === 'touchstart' ? 'touches' : 'changedTouches', {
      value: [{ clientX }],
    });
    element.dispatchEvent(event);
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    componentElement = fixture.nativeElement.querySelector(
      `[data-testid="${APP_TEST_IDS.carousel.root}"]`,
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render one slide per track by default', () => {
    const tracks = componentElement?.querySelectorAll<HTMLDivElement>(
      `[data-testid="${APP_TEST_IDS.carousel.track}"]`,
    );
    let slidesCount: number[] | undefined;

    if (tracks) {
      slidesCount = Array.from(tracks).map(
        (track) =>
          track.querySelectorAll<HTMLDivElement>(`[data-testid="${APP_TEST_IDS.carousel.slide}"]`)
            .length,
      );
    }

    expect(tracks?.length).toBe(3);
    expect(slidesCount).toStrictEqual([1, 1, 1]);
  });

  it('should group slides according to perView', () => {
    fixture.componentInstance.perView.set(2);
    fixture.detectChanges();

    componentElement = fixture.nativeElement.querySelector(
      `[data-testid="${APP_TEST_IDS.carousel.root}"]`,
    );
    const tracks = componentElement?.querySelectorAll<HTMLDivElement>(
      `[data-testid="${APP_TEST_IDS.carousel.track}"]`,
    );
    let slidesCount: number[] | undefined;

    if (tracks) {
      slidesCount = Array.from(tracks).map(
        (track) =>
          track.querySelectorAll<HTMLDivElement>(`[data-testid="${APP_TEST_IDS.carousel.slide}"]`)
            .length,
      );
    }

    expect(tracks?.length).toBe(2);
    expect(slidesCount).toStrictEqual([2, 1]);
  });

  it('should render one track if perView is greater than slides count', () => {
    fixture.componentInstance.perView.set(5);
    fixture.detectChanges();

    const tracks = componentElement?.querySelectorAll<HTMLDivElement>(
      `[data-testid="${APP_TEST_IDS.carousel.track}"]`,
    );
    expect(tracks?.length).toBe(1);
  });

  it('should not render tracks if there are no slides', () => {
    fixture.componentInstance.slides.set([]);
    fixture.detectChanges();

    const tracks = componentElement?.querySelectorAll<HTMLDivElement>(
      `[data-testid="${APP_TEST_IDS.carousel.track}"]`,
    );
    expect(tracks?.length).toBe(0);
  });

  it('should show first slide by default', () => {
    const tracks = componentElement?.querySelectorAll<HTMLDivElement>(
      `[data-testid="${APP_TEST_IDS.carousel.track}"]`,
    );

    expect(tracks?.[0].getAttribute('aria-hidden')).toBe('false');
    expect(tracks?.[1].getAttribute('aria-hidden')).toBe('true');
  });

  it('should go to next slide', () => {
    fixture.componentInstance.switchNext();
    fixture.detectChanges();

    const tracks = componentElement?.querySelectorAll<HTMLDivElement>(
      `[data-testid="${APP_TEST_IDS.carousel.track}"]`,
    );

    expect(tracks?.[0].getAttribute('aria-hidden')).toBe('true');
    expect(tracks?.[1].getAttribute('aria-hidden')).toBe('false');
    expect(tracks?.[2].getAttribute('aria-hidden')).toBe('true');
  });

  it('should go to previous slide', () => {
    fixture.componentInstance.switchNext();
    fixture.componentInstance.switchNext();
    fixture.componentInstance.switchPrevious();
    fixture.detectChanges();

    const tracks = componentElement?.querySelectorAll<HTMLDivElement>(
      `[data-testid="${APP_TEST_IDS.carousel.track}"]`,
    );

    expect(tracks?.[0].getAttribute('aria-hidden')).toBe('true');
    expect(tracks?.[1].getAttribute('aria-hidden')).toBe('false');
    expect(tracks?.[2].getAttribute('aria-hidden')).toBe('true');
  });

  it('should not go to next slide in "slider" type, if it is a last slide', () => {
    fixture.componentInstance.switchNext();
    fixture.componentInstance.switchNext();
    fixture.componentInstance.switchNext();
    fixture.detectChanges();

    const tracks = componentElement?.querySelectorAll<HTMLDivElement>(
      `[data-testid="${APP_TEST_IDS.carousel.track}"]`,
    );

    expect(tracks?.[0].getAttribute('aria-hidden')).toBe('true');
    expect(tracks?.[1].getAttribute('aria-hidden')).toBe('true');
    expect(tracks?.[2].getAttribute('aria-hidden')).toBe('false');
  });

  it('should not go to previous slide in "slider" type, if it is a first slide', () => {
    fixture.componentInstance.switchPrevious();
    fixture.detectChanges();

    const tracks = componentElement?.querySelectorAll<HTMLDivElement>(
      `[data-testid="${APP_TEST_IDS.carousel.track}"]`,
    );

    expect(tracks?.[0].getAttribute('aria-hidden')).toBe('false');
    expect(tracks?.[1].getAttribute('aria-hidden')).toBe('true');
    expect(tracks?.[2].getAttribute('aria-hidden')).toBe('true');
  });

  it('should wrap to the first slide in "carousel" mode after the last slide', () => {
    fixture.componentInstance.type.set('carousel');
    fixture.detectChanges();

    fixture.componentInstance.switchNext();
    fixture.componentInstance.switchNext();
    fixture.componentInstance.switchNext();
    fixture.detectChanges();

    const tracks = componentElement?.querySelectorAll<HTMLDivElement>(
      `[data-testid="${APP_TEST_IDS.carousel.track}"]`,
    );

    expect(tracks?.[0].getAttribute('aria-hidden')).toBe('false');
    expect(tracks?.[1].getAttribute('aria-hidden')).toBe('true');
    expect(tracks?.[2].getAttribute('aria-hidden')).toBe('true');
  });

  it('should wrap to the last slide in "carousel" mode from the first slide', () => {
    fixture.componentInstance.type.set('carousel');
    fixture.detectChanges();

    fixture.componentInstance.switchPrevious();
    fixture.detectChanges();

    const tracks = componentElement?.querySelectorAll<HTMLDivElement>(
      `[data-testid="${APP_TEST_IDS.carousel.track}"]`,
    );

    expect(tracks?.[0].getAttribute('aria-hidden')).toBe('true');
    expect(tracks?.[1].getAttribute('aria-hidden')).toBe('true');
    expect(tracks?.[2].getAttribute('aria-hidden')).toBe('false');
  });

  it('should render picker controls equal to tracks count', () => {
    const pickerControlsEl = componentElement?.querySelectorAll<HTMLButtonElement>(
      `[data-testid="${APP_TEST_IDS.pickerControl.root}"]`,
    );

    expect(pickerControlsEl?.length).toBe(3);
  });

  it('should change the active track when a picker control is clicked', () => {
    const pickerControlsEl = componentElement?.querySelectorAll<HTMLButtonElement>(
      `[data-testid="${APP_TEST_IDS.pickerControl.root}"]`,
    );
    pickerControlsEl?.[2].click();
    fixture.detectChanges();

    const tracks = componentElement?.querySelectorAll<HTMLDivElement>(
      `[data-testid="${APP_TEST_IDS.carousel.track}"]`,
    );

    expect(tracks?.[0].getAttribute('aria-hidden')).toBe('true');
    expect(tracks?.[1].getAttribute('aria-hidden')).toBe('true');
    expect(tracks?.[2].getAttribute('aria-hidden')).toBe('false');
  });

  it('should go to next slide on left swipe', () => {
    const tracksContainer = componentElement?.querySelector<HTMLElement>(
      `[data-testid="${APP_TEST_IDS.carousel.tracks}"]`,
    );

    expect(tracksContainer).toBeTruthy();
    if (!tracksContainer) {
      return;
    }

    dispatchTouchEvent(tracksContainer, 'touchstart', 200);
    dispatchTouchEvent(tracksContainer, 'touchend', 100);
    fixture.detectChanges();

    const tracks = componentElement?.querySelectorAll<HTMLDivElement>(
      `[data-testid="${APP_TEST_IDS.carousel.track}"]`,
    );

    expect(tracks?.[0].getAttribute('aria-hidden')).toBe('true');
    expect(tracks?.[1].getAttribute('aria-hidden')).toBe('false');
    expect(tracks?.[2].getAttribute('aria-hidden')).toBe('true');
  });

  it('should go to previous slide on right swipe', () => {
    fixture.componentInstance.switchNext();
    fixture.componentInstance.switchNext();
    fixture.detectChanges();

    const tracksContainer = componentElement?.querySelector<HTMLElement>(
      `[data-testid="${APP_TEST_IDS.carousel.tracks}"]`,
    );

    expect(tracksContainer).toBeTruthy();
    if (!tracksContainer) {
      return;
    }

    dispatchTouchEvent(tracksContainer, 'touchstart', -200);
    dispatchTouchEvent(tracksContainer, 'touchend', -100);
    fixture.detectChanges();

    const tracks = componentElement?.querySelectorAll<HTMLDivElement>(
      `[data-testid="${APP_TEST_IDS.carousel.track}"]`,
    );

    expect(tracks?.[0].getAttribute('aria-hidden')).toBe('true');
    expect(tracks?.[1].getAttribute('aria-hidden')).toBe('false');
    expect(tracks?.[2].getAttribute('aria-hidden')).toBe('true');
  });
});
