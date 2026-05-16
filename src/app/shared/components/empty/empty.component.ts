import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-empty',
  imports: [NgOptimizedImage],
  templateUrl: './empty.component.html',
  styleUrl: './empty.component.scss',
})
export class EmptyComponent {
  readonly title = input<string>('Data Not Found');
  readonly imgUi = input<string>('/@/assets/icons/smile.svg');
  readonly description = input<string>('');
}
