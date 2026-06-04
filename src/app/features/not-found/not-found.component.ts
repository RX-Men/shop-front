import { RouterLinkComponent } from '@/app/shared/components/router-link';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
  imports: [RouterLink, RouterLinkComponent],
})
export class NotFoundComponent {}
