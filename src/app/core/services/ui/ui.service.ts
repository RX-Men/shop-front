import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import type { DrawerKey } from './ui.service.types';
@Injectable({ providedIn: 'root' })
export class UiService {
  private document = inject(DOCUMENT);

  readonly activeDrawer = signal<DrawerKey | null>(null);

  readonly isScrollLocked = computed(() => this.activeDrawer() !== null);

  constructor() {
    effect(() => {
      this.document.body.classList.toggle('scroll-lock', this.isScrollLocked());
    });
  }

  readonly openDrawer = (key: DrawerKey): void => {
    this.activeDrawer.set(key);
  };

  readonly closeDrawer = (): void => {
    this.activeDrawer.set(null);
  };

  readonly isDrawerOpen = (key: DrawerKey): boolean => {
    return this.activeDrawer() === key;
  };
}
