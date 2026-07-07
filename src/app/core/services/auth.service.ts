import type { LoginCredentials, LoginResult } from '@/app/core/auth/sign-in/sign-in.types';
import type { SignUpPayload } from '@/app/core/auth/sign-up/sign-up.types';
import { AUTH_PROVIDER } from '@/app/core/providers/auth-provider';

import { CartService } from '@/app/core/services/cart.service';
import { LocalStorageService } from '@/app/core/services/local-storage.service';
import { computed, inject, Injectable, signal } from '@angular/core';

import type { Cart, Customer } from '@commercetools/platform-sdk';
import { catchError, from, map, Observable, switchMap, tap, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _auth = inject(AUTH_PROVIDER);
  private readonly _cartService = inject(CartService);
  private readonly _storage = inject(LocalStorageService);

  private readonly _customer = signal<Customer | null>(this._storage.getItem<Customer>('customer'));

  readonly customer = this._customer.asReadonly();
  readonly isAuthenticated = computed(() => this._customer() !== null);

  private _completeAuthSession(
    request$: Promise<{ body: { customer: Customer; cart?: Cart } }>,
    email: string,
    password: string,
  ): Observable<LoginResult> {
    return from(request$).pipe(
      tap(({ body }) => {
        this._customer.set(body.customer);
        this._storage.setItem('customer', body.customer);

        if (body.cart) {
          this._cartService.setCart(body.cart);
        }
      }),
      tap(() => {
        this._auth.initPasswordClient(email, password);
        this._storage.removeItem('anonymousId');
      }),
      switchMap(() => from(this._cartService.loadCart())),
      map(() => ({ email })),
    );
  }

  private _getAnonymousCartData(): {
    anonymousCartId?: string;
    anonymousCartSignInMode?: 'MergeWithExistingCustomerCart';
  } {
    const currentCart = this._cartService.cart();

    if (!currentCart) {
      return {};
    }

    return {
      anonymousCartId: currentCart.id,
      anonymousCartSignInMode: 'MergeWithExistingCustomerCart',
    };
  }

  login(credentials: LoginCredentials): Observable<LoginResult> {
    return this._completeAuthSession(
      this._auth
        .project()
        .me()
        .login()
        .post({
          body: {
            email: credentials.email,
            password: credentials.password,
            ...this._getAnonymousCartData(),
          },
        })
        .execute(),
      credentials.email,
      credentials.password,
    ).pipe(
      catchError((error) => {
        if (this._isInvalidCredentialsError(error)) {
          return throwError(() => new Error('INVALID_CREDENTIALS'));
        }

        return throwError(() => error);
      }),
    );
  }

  register(payload: SignUpPayload): Observable<LoginResult> {
    return this._completeAuthSession(
      this._auth
        .project()
        .me()
        .signup()
        .post({
          body: {
            email: payload.email,
            password: payload.password,
            firstName: payload.firstName,
            lastName: payload.lastName,
            ...this._getAnonymousCartData(),
          },
        })
        .execute(),
      payload.email,
      payload.password,
    ).pipe(
      catchError((error) => {
        if (this._isDuplicateCustomerError(error)) {
          return throwError(() => new Error('EMAIL_ALREADY_EXISTS'));
        }

        return throwError(() => error);
      }),
    );
  }
  private _isDuplicateCustomerError(error: unknown): boolean {
    return (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code: string }).code === 'DuplicateField'
    );
  }
  logout(): void {
    this._customer.set(null);

    this._storage.removeItem('customer');
    this._storage.removeItem('customerToken');
    this._storage.removeItem('refreshToken');
    this._storage.removeItem('cachedCart');

    const anonymousId = crypto.randomUUID();
    this._storage.setItem('anonymousId', anonymousId);

    this._auth.initAnonymousClient(anonymousId);
    this._cartService.clearLocalCart();
  }

  private _isInvalidCredentialsError(error: unknown): boolean {
    return (
      typeof error === 'object' &&
      error !== null &&
      'statusCode' in error &&
      error.statusCode === 400
    );
  }
}
