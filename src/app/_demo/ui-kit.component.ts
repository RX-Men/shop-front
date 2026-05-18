import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { InputComponent } from '../shared/components/input';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-ui-kit',
  imports: [InputComponent, ReactiveFormsModule],
  styles: `
    :host {
      display: block;
      padding: 2rem 3rem;
      font-family: inherit;
    }

    h1 {
      font-size: var(--text-2xl);
      margin-block-end: 2.5rem;
    }

    .kit-section {
      margin-block-end: 3rem;
    }

    .kit-section__title {
      font-size: var(--text-lg);
      font-weight: 600;
      border-block-end: 1px solid var(--neutral-300);
      padding-block-end: 0.5rem;
      margin-block-end: 1.5rem;
    }

    .kit-section__subtitle {
      font-size: var(--text-sm);
      color: var(--neutral-700);
      margin-block-end: 0.75rem;
    }

    .kit-row {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      align-items: flex-start;
      margin-block-end: 1rem;
    }

    .kit-row app-input {
      width: 240px;
    }
  `,
  template: `
    <h1>UI Kit</h1>

    <!-- ─── Input ──────────────────────────────────────────────────── -->
    <section class="kit-section">
      <h2 class="kit-section__title">Input</h2>

      <p class="kit-section__subtitle">Sizes</p>
      <div class="kit-row">
        <app-input label="Small" placeholder="size s" size="s" />
        <app-input label="Medium" placeholder="size m" size="m" />
        <app-input label="Large" placeholder="size l" size="l" />
      </div>

      <p class="kit-section__subtitle">Statuses</p>
      <div class="kit-row">
        <app-input label="Default" placeholder="default" />
        <app-input
          label="Error"
          placeholder="error"
          status="error"
          errorText="This field is required"
        />
        <app-input
          label="Warning"
          placeholder="warning"
          status="warning"
          hint="Double-check this value"
        />
      </div>

      <p class="kit-section__subtitle">States</p>
      <div class="kit-row">
        <app-input label="Disabled" placeholder="disabled" [disabled]="true" />
        <app-input label="Readonly" value="Read-only value" [readonlyMode]="true" />
        <app-input label="Required" placeholder="required field" [required]="true" />
      </div>

      <p class="kit-section__subtitle">Label · hint · error</p>
      <div class="kit-row">
        <app-input
          label="Email"
          placeholder="you@example.com"
          type="email"
          hint="We will never share your email"
        />
        <app-input
          label="Password"
          placeholder="min 8 chars"
          status="error"
          errorText="Too short"
        />
      </div>

      <p class="kit-section__subtitle">Reactive form · two-way binding</p>
      <div class="kit-row">
        <div>
          <app-input label="FormControl" [formControl]="inputCtrl" />
          <small>value: {{ inputCtrl.value }}</small>
        </div>
        <div>
          <app-input label="Two-way [(value)]" [(value)]="twoWayValue" />
          <small>value: {{ twoWayValue }}</small>
        </div>
      </div>

      <p class="kit-section__subtitle">Input types</p>
      <div class="kit-row">
        <app-input label="email" placeholder="you@example.com" type="email" />
        <app-input label="tel" placeholder="+1 555 000" type="tel" />
        <app-input label="url" placeholder="https://" type="url" />
        <app-input label="search" placeholder="Search…" type="search" />
      </div>
    </section>
  `,
})
export class UiKitComponent {
  inputCtrl = new FormControl('initial value');
  twoWayValue = 'edit me';
}
