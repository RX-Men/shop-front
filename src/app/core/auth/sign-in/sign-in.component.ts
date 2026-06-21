import { ButtonComponent } from '@/app/shared/components/button';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CheckboxComponent } from '@/app/shared/components/checkbox';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '@/app/shared/components/input';
import { RouterLinkComponent } from '@/app/shared/components/router-link';
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
  }
}
