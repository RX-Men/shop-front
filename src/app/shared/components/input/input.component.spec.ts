import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let componentRef: ComponentRef<InputComponent>;
  let fixture: ComponentFixture<InputComponent>;
  let nativeEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    nativeEl = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render native input with data-testid', () => {
    const input = nativeEl.querySelector('[data-testid="input-native"]');
    expect(input).toBeTruthy();
  });

  it('should reflect value input on native input', async () => {
    componentRef.setInput('value', 'hello');
    fixture.detectChanges();
    await fixture.whenStable();
    const input = nativeEl.querySelector<HTMLInputElement>('[data-testid="input-native"]');
    expect(input?.value).toBe('hello');
  });

  it('should update value signal on DOM input event', async () => {
    const nativeInput = nativeEl.querySelector<HTMLInputElement>('[data-testid="input-native"]')!;
    nativeInput.value = 'x';
    nativeInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.value()).toBe('x');
  });

  it('should apply size class on size change', () => {
    componentRef.setInput('size', 'l');
    fixture.detectChanges();
    const wrapper = nativeEl.querySelector('[data-testid="input"]');
    expect(wrapper?.classList.contains('input_size_l')).toBe(true);
  });

  it('should disable native input and add disabled class', () => {
    componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const wrapper = nativeEl.querySelector('[data-testid="input"]');
    const nativeInput = nativeEl.querySelector<HTMLInputElement>('[data-testid="input-native"]');
    expect(wrapper?.classList.contains('input_disabled')).toBe(true);
    expect(nativeInput?.disabled).toBe(true);
  });

  it('should show error message and aria-invalid when status=error and errorText set', async () => {
    componentRef.setInput('status', 'error');
    componentRef.setInput('errorText', 'bad');
    fixture.detectChanges();
    await fixture.whenStable();
    const errorEl = nativeEl.querySelector('[data-testid="input-error"]');
    const nativeInput = nativeEl.querySelector<HTMLInputElement>('[data-testid="input-native"]');
    expect(errorEl?.textContent?.trim()).toBe('bad');
    expect(nativeInput?.getAttribute('aria-invalid')).toBe('true');
    expect(nativeInput?.getAttribute('aria-describedby')).toContain('-error');
  });

  it('should render label with for attribute matching input id', async () => {
    componentRef.setInput('label', 'Email');
    fixture.detectChanges();
    await fixture.whenStable();
    const label = nativeEl.querySelector<HTMLLabelElement>('label');
    const nativeInput = nativeEl.querySelector<HTMLInputElement>('[data-testid="input-native"]');
    expect(label).toBeTruthy();
    expect(label?.htmlFor).toBe(nativeInput?.id);
  });
});
