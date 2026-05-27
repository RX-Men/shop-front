import { Directive, ElementRef, inject, input } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { TooltipComponent } from '../../components/tooltip';

@Directive({
  selector: '[appTooltip]',
  host: {
    '(mouseenter)': '_show()',
    '(focus)': '_show()',
    '(mouseleave)': '_hide()',
    '(blur)': '_hide()',
  },
})
export class TooltipDirective {
  readonly tooltipText = input.required<ReturnType<TooltipComponent['text']>>();
  readonly tooltipColor = input<ReturnType<TooltipComponent['color']>>('dark');

  private readonly _overlay = inject(Overlay);

  private readonly _elementRef = inject(ElementRef);
  private _overlayRef: OverlayRef | null = null;

  protected readonly _show = (): void => {
    if (this._overlayRef) {
      return;
    }

    const positionStrategy = this._overlay
      .position()
      .flexibleConnectedTo(this._elementRef)
      .withPositions([
        { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY: -16 },
      ]);

    this._overlayRef = this._overlay.create({ positionStrategy });

    const portal = new ComponentPortal(TooltipComponent);
    const componentRef = this._overlayRef.attach(portal);

    componentRef.instance.setText(this.tooltipText());
    componentRef.instance.setColor(this.tooltipColor());
  };

  protected readonly _hide = (): void => {
    if (!this._overlayRef) {
      return;
    }

    this._overlayRef.dispose();
    this._overlayRef = null;
  };
}
