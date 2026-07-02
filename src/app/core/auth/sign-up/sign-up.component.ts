import { ButtonComponent } from '@/app/shared/components/button';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { DatePickerComponent } from '@/app/shared/components/date-picker';
import { InputComponent } from '@/app/shared/components/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import signUpContent from '@/app/content/pages/sign-up/sign-up.json' with { type: 'json' };
import { AuthService } from '@/app/core/services/auth.service';
import { MAX_AGE, MIN_AGE, NAME_PATTERN, POSTAL_CODE_PATTERNS } from './sign-up.constants';
import { SignUpPayload } from './sign-up.types';
import {
  maxAgeValidator,
  minAgeValidator,
  passwordMatchValidator,
  postalCodeValidator,
} from './sign-up.utils';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, DatePickerComponent, InputComponent, ReactiveFormsModule],
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
      dateOfBirth: new FormControl('', [
        Validators.required,
        minAgeValidator(MIN_AGE),
        maxAgeValidator(MAX_AGE),
      ]),
      address: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required, postalCodeValidator]),
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

  getDateOfBirthErrorText(): string {
    const errors = this.signUpForm.controls.dateOfBirth.errors;

    if (errors?.['required']) {
      return this.content.errors.dateOfBirth.required;
    }
    if (errors?.['minAge']) {
      return this.content.errors.dateOfBirth.minAge.replace('{minAge}', errors['minAge'].required);
    }
    if (errors?.['maxAge']) {
      return this.content.errors.dateOfBirth.maxAge;
    }

    return '';
  }

  getAddressErrorText(): string {
    const errors = this.signUpForm.controls.address.errors;

    if (errors?.['required']) {
      return this.content.errors.address.required;
    }

    return '';
  }

  getCountryErrorText(): string {
    const errors = this.signUpForm.controls.country.errors;

    if (errors?.['required']) {
      return this.content.errors.country.required;
    }

    return '';
  }

  getPostalCodeErrorText(): string {
    const errors = this.signUpForm.controls.postalCode.errors;

    if (errors?.['required']) {
      return this.content.errors.postalCode.required;
    }

    if (errors?.['postalCode']) {
      const country: string = errors['postalCode'].country;
      const example = POSTAL_CODE_PATTERNS[country]?.example;
      return this.content.errors.postalCode.format.replace('{example}', example ?? '');
    }

    return '';
  }

  onCountryChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.signUpForm.controls.country.setValue(value);
    this.signUpForm.controls.country.markAsDirty();
    this.signUpForm.controls.postalCode.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    const { email, password, firstName, lastName, dateOfBirth, address, country, postalCode } =
      this.signUpForm.getRawValue();

    const payload: SignUpPayload = {
      email: email!,
      password: password!,
      firstName: firstName!,
      lastName: lastName!,
      dateOfBirth: dateOfBirth!,
      addresses: [{ streetName: address!, country: country!, postalCode: postalCode! }],
      defaultShippingAddress: 0,
      defaultBillingAddress: 0,
    };

    this._authService.register(payload).subscribe({
      next: () => {
        this.submitted.set(true);
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
