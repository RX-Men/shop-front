import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import type { LoginCredentials, LoginResult } from '@/app/core/auth/sign-in/sign-in.types';
import type { SignUpPayload } from '@/app/core/auth/sign-up/sign-up.types';

// mock credentials, temporary until real commercetools login is wired up
const DEMO_EMAIL = 'demo@ilovecomics.com';
const DEMO_PASSWORD = 'demo12345';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(credentials: LoginCredentials): Observable<LoginResult> {
    if (credentials.email === DEMO_EMAIL && credentials.password === DEMO_PASSWORD) {
      return of({ email: credentials.email });
    }

    return throwError(() => new Error('INVALID_CREDENTIALS'));
  }

  register(payload: SignUpPayload): void {
    console.log('[mock] Registration payload:', payload);
  }
}
