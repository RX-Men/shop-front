import { ButtonComponent } from '@/app/shared/components/button';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CheckboxComponent } from '@/app/shared/components/checkbox';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InputComponent } from '@/app/shared/components/input';
import { RouterLinkComponent } from '@/app/shared/components/router-link';
import { AuthService } from '@/app/core/services/auth.service';
import { ROUTES } from '@/app/core/constants/routes';
import signInContent from '@/app/content/pages/sign-in/sign-in.json' with { type: 'json' };

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonComponent,
    CheckboxComponent,
    InputComponent,
    ReactiveFormsModule,
    RouterLinkComponent,
  ],
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  readonly content = signInContent;
  protected readonly _routes = ROUTES;

  private readonly _destroyRef = inject(DestroyRef);
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);

  readonly authError = signal('');

  readonly signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    rememberMe: new FormControl(false),
  });

  getEmailErrorText(): string {
    const errors = this.signInForm.controls.email.errors;

    if (errors?.['required']) {
      return this.content.errors.email.required;
    }
    if (errors?.['email']) {
      return this.content.errors.email.email;
    }

    return '';
  }

  getPasswordErrorText(): string {
    const errors = this.signInForm.controls.password.errors;

    if (errors?.['required']) {
      return this.content.errors.password.required;
    }
    if (errors?.['minlength']) {
      return this.content.errors.password.minlength;
    }

    return '';
  }

  onSubmit(): void {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    this.authError.set('');

    const { email, password } = this.signInForm.getRawValue();

    this._authService
      .login({ email: email!, password: password! })
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: () => this._router.navigate(['/']),
        error: (err: unknown) => {
          const message = err instanceof Error ? err.message : '';
          if (message === 'INVALID_CREDENTIALS') {
            this.authError.set(this.content.errors.auth.invalidCredentials);
          } else {
            this.authError.set(this.content.errors.auth.generic);
          }
        },
      });
  }
}
