import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
  host: {
    '(click)': '_closeOnBackdrop($event)',
    '(document:keydown.escape)': '_closeOnEscape($event)',
  },
})
export class DrawerComponent {
  readonly isOpen = input<boolean>();
  readonly closed = output();

  protected readonly _closeOnBackdrop = ({ target }: Event): void => {
    if (!this.isOpen() || !(target instanceof HTMLElement) || target.closest('.drawer__wrapper')) {
      return;
    }

    this.closed.emit();
  };

  protected readonly _closeOnEscape = (event: Event): void => {
    if (!this.isOpen() || !(event instanceof KeyboardEvent) || event.key !== 'Escape') {
      return;
    }

    this.closed.emit();
  };
}
