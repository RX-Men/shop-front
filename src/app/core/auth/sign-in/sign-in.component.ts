import { ButtonComponent } from '@/app/shared/components/button';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InputComponent } from '@/app/shared/components/input';
import { RouterLinkComponent } from '@/app/shared/components/router-link';
import { ROUTES } from '@/app/core/constants/routes';
import signInContent from '@/app/content/pages/sign-in/sign-in.json' with { type: 'json' };

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, InputComponent, RouterLinkComponent],
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  readonly content = signInContent;
  protected readonly _routes = ROUTES;
}
