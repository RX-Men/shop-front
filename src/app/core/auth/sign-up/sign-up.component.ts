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
  Validators,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';

function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (!password || !confirmPassword) {
    return null;
  }

  return password === confirmPassword ? null : { passwordMismatch: true };
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, DatePickerComponent, InputComponent, JsonPipe, ReactiveFormsModule],
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

  onSubmit(): void {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }
    console.log(this.signUpForm.value);
  }
}
