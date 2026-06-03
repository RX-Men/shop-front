import { ButtonComponent } from '@/app/shared/components/button';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DatePickerComponent } from '@/app/shared/components/date-picker';
import { InputComponent } from '@/app/shared/components/input';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, DatePickerComponent, InputComponent],
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {}
