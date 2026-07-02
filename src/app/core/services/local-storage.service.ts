import { Injectable } from '@angular/core';

export type StorageKey =
  'anonymousId' | 'cachedCart' | 'customer' | 'customerToken' | 'refreshToken';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly _prefix = 'sf_comics_';

  getItem<T>(key: StorageKey): T | null {
    try {
      const item = localStorage.getItem(this._prefix + key);

      return item ? (JSON.parse(item) as T) : null;
    } catch {
      return null;
    }
  }

  setItem<T>(key: StorageKey, value: T): void {
    try {
      localStorage.setItem(this._prefix + key, JSON.stringify(value));
    } catch {
      console.error(`Failed to save ${key} to localStorage`);
    }
  }

  removeItem(key: StorageKey): void {
    localStorage.removeItem(this._prefix + key);
  }

  clear(): void {
    localStorage.clear();
  }
}
