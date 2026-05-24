import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  readonly image = input<string>('');
  readonly title = input<string>('Denis');
  readonly description = input<string>(
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus adipisci asperiores dicta,',
  );
}
