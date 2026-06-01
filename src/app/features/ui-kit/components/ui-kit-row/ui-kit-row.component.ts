import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-ui-kit-row',
  templateUrl: './ui-kit-row.component.html',
  styleUrl: './ui-kit-row.component.scss',
})
export class UiKitRowComponent {
  readonly title = input<string>('');
}
