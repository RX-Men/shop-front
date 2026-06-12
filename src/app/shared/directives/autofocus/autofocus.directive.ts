import { Directive, effect, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: '[appAutofocus]',
})
export class AutofocusDirective {
  readonly appAutofocus = input<boolean>(false);

  private readonly _el = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    effect(() => {
      const autofocus = this.appAutofocus();
      if (!autofocus) {
        return;
      }

      const { nativeElement } = this._el;
      if (nativeElement instanceof HTMLInputElement) {
        nativeElement.focus();
      } else {
        nativeElement.querySelector('input')?.focus();
      }
    });
  }
}
