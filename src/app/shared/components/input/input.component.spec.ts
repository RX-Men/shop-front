import { ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { APP_TEST_IDS } from '@/app/app.test-ids';

import { InputComponent } from './input.component';

const testIds = APP_TEST_IDS.input;
const byTestId = (id: string): string => `[data-testid="${id}"]`;

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
    const input = nativeEl.querySelector(byTestId(testIds.native));
    expect(input).toBeTruthy();
  });

  it('should reflect value input on native input', async () => {
    componentRef.setInput('value', 'hello');
    fixture.detectChanges();
    await fixture.whenStable();
    const input = nativeEl.querySelector<HTMLInputElement>(byTestId(testIds.native));
    expect(input?.value).toBe('hello');
  });

  it('should update value signal on DOM input event', async () => {
    const nativeInput = nativeEl.querySelector<HTMLInputElement>(byTestId(testIds.native))!;
    nativeInput.value = 'x';
    nativeInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.value()).toBe('x');
  });

  it('should apply size class on size change', () => {
    componentRef.setInput('size', 'l');
    fixture.detectChanges();
    const wrapper = nativeEl.querySelector(byTestId(testIds.root));
    expect(wrapper?.classList.contains('input_size_l')).toBe(true);
  });

  it('should disable native input and add disabled class', () => {
    componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const wrapper = nativeEl.querySelector(byTestId(testIds.root));
    const nativeInput = nativeEl.querySelector<HTMLInputElement>(byTestId(testIds.native));
    expect(wrapper?.classList.contains('input_disabled')).toBe(true);
    expect(nativeInput?.disabled).toBe(true);
  });

  it('should show error message and aria-invalid when error=true and errorText set', async () => {
    componentRef.setInput('error', true);
    componentRef.setInput('errorText', 'bad');
    fixture.detectChanges();
    await fixture.whenStable();
    const errorEl = nativeEl.querySelector(byTestId(testIds.error));
    const nativeInput = nativeEl.querySelector<HTMLInputElement>(byTestId(testIds.native));
    expect(errorEl?.textContent?.trim()).toBe('bad');
    expect(nativeInput?.getAttribute('aria-invalid')).toBe('true');
    expect(nativeInput?.getAttribute('aria-describedby')).toContain('-error');
  });

  it('should render label with for attribute matching input id', async () => {
    componentRef.setInput('label', 'Email');
    fixture.detectChanges();
    await fixture.whenStable();
    const label = nativeEl.querySelector<HTMLLabelElement>('label');
    const nativeInput = nativeEl.querySelector<HTMLInputElement>(byTestId(testIds.native));
    expect(label).toBeTruthy();
    expect(label?.htmlFor).toBe(nativeInput?.id);
  });

  it('should set native input type attribute to "password"', () => {
    componentRef.setInput('type', 'password');
    fixture.detectChanges();
    const nativeInput = nativeEl.querySelector<HTMLInputElement>(byTestId(testIds.native));
    expect(nativeInput?.type).toBe('password');
  });

  it('should show toggle button when type="password"', () => {
    componentRef.setInput('type', 'password');
    fixture.detectChanges();
    const toggle = nativeEl.querySelector<HTMLButtonElement>(byTestId(testIds.passwordToggle));
    expect(toggle).toBeTruthy();
  });

  it('should reveal password when toggle is clicked', async () => {
    componentRef.setInput('type', 'password');
    fixture.detectChanges();
    const nativeInput = nativeEl.querySelector<HTMLInputElement>(byTestId(testIds.native))!;
    const toggle = nativeEl.querySelector<HTMLButtonElement>(byTestId(testIds.passwordToggle))!;

    toggle.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(nativeInput.type).toBe('text');
  });

  it('should hide password when toggle is clicked twice', async () => {
    componentRef.setInput('type', 'password');
    fixture.detectChanges();
    const nativeInput = nativeEl.querySelector<HTMLInputElement>(byTestId(testIds.native))!;
    const toggle = nativeEl.querySelector<HTMLButtonElement>(byTestId(testIds.passwordToggle))!;

    toggle.click();
    fixture.detectChanges();
    await fixture.whenStable();

    toggle.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(nativeInput.type).toBe('password');
  });
});
