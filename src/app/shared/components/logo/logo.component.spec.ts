import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { LogoComponent } from './logo.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LogoComponent],
  template: `<app-logo [imgPriority]="imgPriority()" [linkable]="linkable()" />`,
})
class TestHostComponent {
  readonly imgPriority = signal<boolean>(true);
  readonly linkable = signal<boolean>(true);
}

describe('LogoComponent', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  const createTestEnvironment = async (options?: {
    imgPriority?: boolean;
    linkable?: boolean;
  }): Promise<void> => {
    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;

    if (options?.imgPriority !== undefined) {
      hostComponent.imgPriority.set(options.imgPriority);
    }

    if (options?.linkable !== undefined) {
      hostComponent.linkable.set(options.linkable);
    }

    fixture.detectChanges();
    await fixture.whenStable();
  };

  it('should create', async () => {
    await createTestEnvironment();

    expect(hostComponent).toBeTruthy();
  });

  it('should be wrapped inside anchor tag by default', async () => {
    await createTestEnvironment();

    const anchorEl: HTMLAnchorElement | null = fixture.nativeElement.querySelector('a');
    expect(anchorEl).toBeTruthy();
    expect(anchorEl?.getAttribute('href')).toBe('/');
    expect(anchorEl?.getAttribute('aria-label')).toBe('Go to Home page');
  });

  it('should not have anchor tag if "linkable" is false', async () => {
    await createTestEnvironment({ linkable: false });

    const anchorEl: HTMLAnchorElement | null = fixture.nativeElement.querySelector('a');
    expect(anchorEl).toBeNull();
  });

  it('should be marked "priority" by default', async () => {
    await createTestEnvironment();

    const imgEl: HTMLImageElement | null = fixture.nativeElement.querySelector('img');
    expect(imgEl).toBeTruthy();
    expect(imgEl?.getAttribute('fetchpriority')).toBe('high');
    expect(imgEl?.getAttribute('loading')).toBe('eager');
  });

  it('should have lazy loading if priority is not initially set', async () => {
    await createTestEnvironment({ imgPriority: false });

    const imgEl: HTMLImageElement | null = fixture.nativeElement.querySelector('img');
    expect(imgEl).toBeTruthy();
    expect(imgEl?.getAttribute('fetchpriority')).toBe('auto');
    expect(imgEl?.getAttribute('loading')).toBe('lazy');
  });
});
