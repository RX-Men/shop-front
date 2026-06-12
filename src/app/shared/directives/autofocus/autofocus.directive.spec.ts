import { TestBed } from '@angular/core/testing';
import { AutofocusDirective } from './autofocus.directive';
import { ElementRef } from '@angular/core';

describe('AutofocusDirective', () => {
  it('should create an instance', () => {
    const mockElementRef = { nativeElement: document.createElement('div') };

    TestBed.configureTestingModule({
      providers: [AutofocusDirective, { provide: ElementRef, useValue: mockElementRef }],
    });

    TestBed.runInInjectionContext(() => {
      const directive = new AutofocusDirective();
      expect(directive).toBeTruthy();
    });
  });
});
