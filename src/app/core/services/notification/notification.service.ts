import { Injectable, signal } from '@angular/core';

import type { Toast } from '@/app/shared/components/toast';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  readonly notifications = signal<Toast[]>([]);

  add(notification: Omit<Toast, 'id'>): void {
    this.notifications.update((prevState) => [
      ...prevState,
      {
        ...notification,
        id: crypto.randomUUID(),
      },
    ]);
  }

  remove(id: Toast['id']): void {
    this.notifications.update((prevState) =>
      prevState.filter((notification) => notification.id !== id),
    );
  }
}
