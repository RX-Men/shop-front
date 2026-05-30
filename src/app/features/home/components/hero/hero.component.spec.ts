import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroComponent } from './hero.component';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let componentRef: ComponentRef<HeroComponent>;
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    componentRef.setInput('carouselBanners', [
      {
        title: "X-Men ' 97",
        subtitle:
          "Marvel Comics presents a terrifying new publishing line from a superstar lineup of creators, kicking off with 'Midnight X-Men' by Jonathan Hickman and Matteo Della Fonte in August 2026",
        img: 'assets/images/xm97s2_com_mas_dsk_01.jpg',
        links: [
          {
            text: 'Watch trailer',
            href: 'https://www.youtube.com/watch?v=mfUtseK27pc&time_continue=3&source_ve_path=NzY3NTg&embeds_referring_euri=https%3A%2F%2Fwww.marvel.com%2F',
          },
        ],
      },
    ]);

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
