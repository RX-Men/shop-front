import { ChangeDetectionStrategy, Component, ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

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

describe('InputComponent — ControlValueAccessor', () => {
  @Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [InputComponent, ReactiveFormsModule],
    template: `<app-input [formControl]="ctrl" />`,
  })
  class HostComponent {
    ctrl = new FormControl('init');
  }

  let hostFixture: ComponentFixture<HostComponent>;
  let hostEl: HTMLElement;
  let ctrl: FormControl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
    }).compileComponents();

    hostFixture = TestBed.createComponent(HostComponent);
    hostEl = hostFixture.nativeElement as HTMLElement;
    ctrl = hostFixture.componentInstance.ctrl;
    hostFixture.detectChanges();
    await hostFixture.whenStable();
  });

  it('should show initial FormControl value', () => {
    const nativeInput = hostEl.querySelector<HTMLInputElement>('[data-testid="input-native"]');
    expect(nativeInput?.value).toBe('init');
  });

  it('should update DOM when FormControl value changes', async () => {
    ctrl.setValue('changed');
    hostFixture.detectChanges();
    await hostFixture.whenStable();
    const nativeInput = hostEl.querySelector<HTMLInputElement>('[data-testid="input-native"]');
    expect(nativeInput?.value).toBe('changed');
  });

  it('should update FormControl when user types', async () => {
    const nativeInput = hostEl.querySelector<HTMLInputElement>('[data-testid="input-native"]')!;
    nativeInput.value = 'typed';
    nativeInput.dispatchEvent(new Event('input'));
    hostFixture.detectChanges();
    await hostFixture.whenStable();
    expect(ctrl.value).toBe('typed');
  });

  it('should disable native input when FormControl is disabled', async () => {
    ctrl.disable();
    hostFixture.detectChanges();
    await hostFixture.whenStable();
    const nativeInput = hostEl.querySelector<HTMLInputElement>('[data-testid="input-native"]');
    expect(nativeInput?.disabled).toBe(true);
  });

  it('should show empty string on FormControl reset (no null crash)', async () => {
    ctrl.reset();
    hostFixture.detectChanges();
    await hostFixture.whenStable();
    const nativeInput = hostEl.querySelector<HTMLInputElement>('[data-testid="input-native"]');
    expect(nativeInput?.value).toBe('');
  });

  it('should mark FormControl as touched on blur', async () => {
    const nativeInput = hostEl.querySelector<HTMLInputElement>('[data-testid="input-native"]')!;
    nativeInput.dispatchEvent(new FocusEvent('blur'));
    hostFixture.detectChanges();
    await hostFixture.whenStable();
    expect(ctrl.touched).toBe(true);
  });
});
