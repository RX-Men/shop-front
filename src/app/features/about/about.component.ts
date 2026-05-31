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
      name: 'Boris',
      description:
        'I am a serene presence driven by hidden, unseen energies. My everyday superpower is flexibility: whether I am centering divs with the magic of flexbox or doing mind-bending yoga stretches like the splits. Life is a game of chance, and just like Gambit, I’m here to bend reality, build and play it with style and grace.',
      promoCode: 'MYSTICFLEX',
      imgSrc: '/assets/images/Boris.jpg',
      company: 'Blondie',
      linkHref: 'https://github.com/elrouss',
    },
    {
      id: 2,
      name: 'Denis',
      description:
        'I am an engineering genius encased in high-tech armor and powered by an unstoppable arc reactor. My everyday superpower is precision and automation: whether I am structuring flawless layouts with clean code or instantly solving complex technical bugs. Life is a continuous upgrade, and I am here to engineer reality, defend my innovations, and win with peak efficiency and a touch of billionaire sarcasm.',
      promoCode: 'MYSTICFLEX',
      imgSrc: '/assets/images/Denis.jpg',
      company: 'Blondie',
      linkHref: 'https://github.com/den987655',
    },
    {
      id: 3,
      name: 'Boris',
      description:
        'I am a serene presence driven by hidden, unseen energies. My everyday superpower is flexibility: whether I am centering divs with the magic of flexbox or doing mind-bending yoga stretches like the splits. Life is a game of chance, and just like Gambit, I’m here to bend reality, build and play it with style and grace.',
      promoCode: 'MYSTICFLEX',
      imgSrc: '/assets/images/Boris.jpg',
      company: 'Blondie',
      linkHref: 'https://github.com/elrouss',
    },
  ];
}
