import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-ui-kit-section',
  templateUrl: './ui-kit-section.component.html',
  styleUrl: './ui-kit-section.component.scss',
})
export class UiKitSectionComponent {
  readonly title = input<string>('');
}
