import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FooterComponent } from './core/layout/footer';
import { HeaderComponent } from './core/layout/header';
import { ToastListComponent } from './shared/components/toast-list';

import { NotificationService } from './core/services/notification';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [FooterComponent, HeaderComponent, RouterOutlet, ToastListComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly _notificationService = inject(NotificationService);
}
