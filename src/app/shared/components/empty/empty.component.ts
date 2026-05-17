import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IconComponent } from '../icon';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-empty',
  imports: [IconComponent],
  templateUrl: './empty.component.html',
  styleUrl: './empty.component.scss',
})
export class EmptyComponent {
  readonly icon = input<ReturnType<IconComponent['name']>>('search-off');
  readonly title = input<string>('Data Not Found');
  readonly description = input<string>('');
}
