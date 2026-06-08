import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { POSTAL_CODE_PATTERNS } from './sign-up.constants';

export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
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

export function minAgeValidator(minAge: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const age = calcAge(control.value);

    return age >= minAge ? null : { minAge: { required: minAge, actual: age } };
  };
}

export function maxAgeValidator(maxAge: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const age = calcAge(control.value);

    return age <= maxAge ? null : { maxAge: { limit: maxAge, actual: age } };
  };
}

export function postalCodeValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) {
    return null;
  }

  const country: string = control.parent?.get('country')?.value;

  if (!country) {
    return null;
  }

  const config = POSTAL_CODE_PATTERNS[country];

  return config?.pattern.test(control.value) ? null : { postalCode: { country } };
}
