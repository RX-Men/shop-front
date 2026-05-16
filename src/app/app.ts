import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmptyComponent } from './shared/components/empty/empty.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [RouterOutlet, EmptyComponent],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('shop-front');
}
