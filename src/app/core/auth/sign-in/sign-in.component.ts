import { ButtonComponent } from '@/app/shared/components/button';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CheckboxComponent } from '@/app/shared/components/checkbox';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
    email: new FormControl(''),
    password: new FormControl(''),
    rememberMe: new FormControl(false),
  });

  onSubmit(): void {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }
  }
}
