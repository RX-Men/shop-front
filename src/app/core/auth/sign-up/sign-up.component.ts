import signUpContent from '@/app/content/pages/sign-up/sign-up.json' with { type: 'json' };
import { AuthService } from '@/app/core/services/auth.service';
import { AlertComponent } from '@/app/shared/components/alert';
import { ButtonComponent } from '@/app/shared/components/button';
import { InputComponent } from '@/app/shared/components/input';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { NAME_PATTERN } from './sign-up.constants';
import { SignUpPayload } from './sign-up.types';
import { passwordMatchValidator } from './sign-up.utils';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, InputComponent, ReactiveFormsModule, AlertComponent],
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  readonly content = signUpContent;
  private readonly _authService = inject(AuthService);
  private readonly _destroyRef = inject(DestroyRef);

  readonly isLoading = signal(false);
  readonly serverError = signal('');

  readonly signUpForm = new FormGroup(
    {
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required, Validators.pattern(NAME_PATTERN)]),
      lastName: new FormControl('', [Validators.required, Validators.pattern(NAME_PATTERN)]),
    },
    {
      validators: [passwordMatchValidator],
    },
  );

  readonly submitted = signal(false);

  getEmailErrorText(): string {
    const errors = this.signUpForm.controls.email.errors;
    if (!errors) {
      return '';
    }

    const errorMap: Record<string, string> = {
      required: this.content.errors.email.required,
      email: this.content.errors.email.email,
      duplicate: 'A customer with this email already exists.',
    };
    return Object.keys(errorMap).find((key) => errors[key])
      ? errorMap[Object.keys(errorMap).find((key) => errors[key])!]
      : '';
  }

  getPasswordErrorText(): string {
    const errors = this.signUpForm.controls.password.errors;

    if (errors?.['required']) {
      return this.content.errors.password.required;
    }
    if (errors?.['minlength']) {
      return this.content.errors.password.minlength;
    }

    return '';
  }

  getConfirmPasswordErrorText(): string {
    const errors = this.signUpForm.controls.confirmPassword.errors;

    if (errors?.['required']) {
      return this.content.errors.confirmPassword.required;
    }
    if (this.signUpForm.errors?.['passwordMismatch']) {
      return this.content.errors.confirmPassword.passwordMismatch;
    }

    return '';
  }

  getFirstNameErrorText(): string {
    const errors = this.signUpForm.controls.firstName.errors;

    if (errors?.['required']) {
      return this.content.errors.firstName.required;
    }
    if (errors?.['pattern']) {
      return this.content.errors.firstName.pattern;
    }

    return '';
  }

  getLastNameErrorText(): string {
    const errors = this.signUpForm.controls.lastName.errors;

    if (errors?.['required']) {
      return this.content.errors.lastName.required;
    }
    if (errors?.['pattern']) {
      return this.content.errors.lastName.pattern;
    }

    return '';
  }

  onSubmit(): void {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    const { email, password, firstName, lastName } = this.signUpForm.getRawValue();

    const payload: SignUpPayload = {
      email: email!,
      password: password!,
      firstName: firstName!,
      lastName: lastName!,
    };
    this.isLoading.set(true);
    this.serverError.set('');

    this._authService
      .register(payload)
      .pipe(
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe({
        next: () => {
          this.submitted.set(true);
        },
        error: (error: Error) => {
          if (error.message === 'EMAIL_ALREADY_EXISTS') {
            this.signUpForm.controls.email.setErrors({
              duplicate: true,
            });
            this.signUpForm.controls.email.markAsTouched();
          } else {
            this.serverError.set('Something went wrong. Please try again.');
          }
        },
      });
  }

  canDeactivate(): boolean {
    if (this.signUpForm.pristine) {
      return true;
    }
    return confirm(this.content.messages.unsavedChanges);
  }
}
