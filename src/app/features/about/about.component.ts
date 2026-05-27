import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  readonly cards = [
    {
      id: 1,
      image: '/assets/images/image.png',
      name: 'Dana Young Coston',
      company: 'Blondie',
    },
    {
      id: 2,
      image: '/assets/images/image.png',
      name: 'Maritsa Patrinos',
      company: 'Six Chix',
    },
    {
      id: 3,
      image: '/assets/images/image.png',
      name: 'Maritsa Patrinos',
      company: 'Six Chix',
    },
  ];
}
