import { ComponentRef, Directive, effect, ElementRef, inject, input } from '@angular/core';
import { ConnectionPositionPair, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { TooltipComponent } from '../../components/tooltip';

const STEP = 16;

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
  readonly tooltipPosition = input<ReturnType<TooltipComponent['position']>>('block-start');
  readonly tooltipColor = input<ReturnType<TooltipComponent['color']>>('dark');

  private readonly _overlay = inject(Overlay);

  private readonly _elementRef = inject(ElementRef);
  private _overlayRef: OverlayRef | null = null;
  private _componentRef: ComponentRef<TooltipComponent> | null = null;

  constructor() {
    effect(() => {
      const text = this.tooltipText();
      this._componentRef?.instance.text.set(text);
    });
  }

  protected readonly _show = (): void => {
    if (this._overlayRef) {
      return;
    }

    const positionStrategy = this._overlay
      .position()
      .flexibleConnectedTo(this._elementRef)
      .withPositions(this._getPositions());

    this._overlayRef = this._overlay.create({ positionStrategy });

    const portal = new ComponentPortal(TooltipComponent);
    this._componentRef = this._overlayRef.attach(portal);

    this._componentRef.instance.text.set(this.tooltipText());
    this._componentRef.instance.color.set(this.tooltipColor());
    this._componentRef.instance.position.set(this.tooltipPosition());
  };

  protected readonly _hide = (): void => {
    if (!this._overlayRef) {
      return;
    }

    this._overlayRef.dispose();
    this._overlayRef = null;
    this._componentRef = null;
  };

  private readonly _getPositions = (): ConnectionPositionPair[] => {
    switch (this.tooltipPosition()) {
      case 'block-start':
        return [
          {
            originX: 'center',
            originY: 'top',
            overlayX: 'center',
            overlayY: 'bottom',
            offsetY: STEP * -1,
          },
        ];
      case 'block-end':
        return [
          {
            originX: 'center',
            originY: 'bottom',
            overlayX: 'center',
            overlayY: 'top',
            offsetY: STEP,
          },
        ];
      case 'inline-start':
        return [
          {
            originX: 'start',
            originY: 'center',
            overlayX: 'end',
            overlayY: 'center',
            offsetX: STEP * -1,
          },
        ];
      case 'inline-end':
        return [
          {
            originX: 'end',
            originY: 'center',
            overlayX: 'start',
            overlayY: 'center',
            offsetX: STEP,
          },
        ];
      default:
        return [
          {
            originX: 'center',
            originY: 'top',
            overlayX: 'center',
            overlayY: 'bottom',
          },
        ];
    }
  };
}
