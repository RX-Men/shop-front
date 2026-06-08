import { Injectable } from '@angular/core';

import type { SignUpPayload } from '@/app/core/auth/sign-up/sign-up.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  register(payload: SignUpPayload): void {
    console.log('[mock] Registration payload:', payload);
  }
}
