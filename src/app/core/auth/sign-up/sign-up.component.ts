import { ButtonComponent } from '@/app/shared/components/button';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DatePickerComponent } from '@/app/shared/components/date-picker';
import { InputComponent } from '@/app/shared/components/input';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (!password || !confirmPassword) {
    return null;
  }

  return password === confirmPassword ? null : { passwordMismatch: true };
}

function calcAge(birthValue: string): number {
  const birth = new Date(birthValue);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();

  const notYetHadBirthday =
    today.getMonth() < birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate());

  if (notYetHadBirthday) {
    age--;
  }

  return age;
}

function minAgeValidator(minAge: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const age = calcAge(control.value);

    return age >= minAge ? null : { minAge: { required: minAge, actual: age } };
  };
}

function maxAgeValidator(maxAge: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const age = calcAge(control.value);

    return age <= maxAge ? null : { maxAge: { limit: maxAge, actual: age } };
  };
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, DatePickerComponent, InputComponent, ReactiveFormsModule],
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  readonly signUpForm = new FormGroup(
    {
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-ZЀ-ӿ\s'-]+$/),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-ZЀ-ӿ\s'-]+$/),
      ]),
      dateOfBirth: new FormControl('', [
        Validators.required,
        minAgeValidator(13),
        maxAgeValidator(120),
      ]),
    },
    {
      validators: [passwordMatchValidator],
    },
  );

  getEmailErrorText(): string {
    const errors = this.signUpForm.controls.email.errors;

    if (errors?.['required']) {
      return 'Email is required';
    }

    if (errors?.['email']) {
      return 'Enter a valid email';
    }

    return '';
  }

  getPasswordErrorText(): string {
    const errors = this.signUpForm.controls.password.errors;

    if (errors?.['required']) {
      return 'Password is required';
    }

    if (errors?.['minlength']) {
      return 'Password must contain 8 or more characters';
    }

    return '';
  }

  getConfirmPasswordErrorText(): string {
    const errors = this.signUpForm.controls.confirmPassword.errors;

    if (errors?.['required']) {
      return 'Confirm password is required';
    }

    if (this.signUpForm.errors?.['passwordMismatch']) {
      return 'Passwords do not match';
    }

    return '';
  }

  getFirstNameErrorText(): string {
    const errors = this.signUpForm.controls.firstName.errors;

    if (errors?.['required']) {
      return 'First name is required';
    }

    if (errors?.['pattern']) {
      return 'First name may only contain letters, spaces, hyphens, and apostrophes';
    }

    return '';
  }

  getLastNameErrorText(): string {
    const errors = this.signUpForm.controls.lastName.errors;

    if (errors?.['required']) {
      return 'Last name is required';
    }

    if (errors?.['pattern']) {
      return 'Last name may only contain letters, spaces, hyphens, and apostrophes';
    }

    return '';
  }

  getDateOfBirthErrorText(): string {
    const errors = this.signUpForm.controls.dateOfBirth.errors;

    if (errors?.['required']) {
      return 'Date of birth is required';
    }

    if (errors?.['minAge']) {
      return `You must be at least ${errors['minAge'].required} years old to register`;
    }

    if (errors?.['maxAge']) {
      return `Please enter a realistic date of birth`;
    }

    return '';
  }

  onSubmit(): void {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }
    console.log(this.signUpForm.value);
  }
}
