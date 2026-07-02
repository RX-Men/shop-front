import signUpContent from '@/app/content/pages/sign-up/sign-up.json' with { type: 'json' };
import { AuthService } from '@/app/core/services/auth.service';
import { ButtonComponent } from '@/app/shared/components/button';
import { InputComponent } from '@/app/shared/components/input';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NAME_PATTERN } from './sign-up.constants';
import { SignUpPayload } from './sign-up.types';
import { passwordMatchValidator } from './sign-up.utils';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, InputComponent, ReactiveFormsModule],
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  readonly content = signUpContent;
  private readonly _authService = inject(AuthService);

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

    if (errors?.['required']) {
      return this.content.errors.email.required;
    }
    if (errors?.['email']) {
      return this.content.errors.email.email;
    }
    if (errors?.['duplicate']) {
      return 'A customer with this email already exists.';
    }

    return '';
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

    this._authService.register(payload).subscribe({
      next: () => {
        this.submitted.set(true);
      },
      error: (error: Error) => {
        console.log(error);
        console.log(error.message);
        if (error.message === 'EMAIL_ALREADY_EXISTS') {
          this.signUpForm.controls.email.setErrors({
            duplicate: true,
          });
          console.log(this.signUpForm.controls.email.errors);
          this.signUpForm.controls.email.markAsTouched();

          console.log(this.signUpForm.controls.email.errors);
          console.log(this.getEmailErrorText());
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
