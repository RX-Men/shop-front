import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { InputComponent } from '../shared/components/input';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-input-demo',
  imports: [InputComponent, ReactiveFormsModule],
  template: `
    <div
      style="
        max-width: 480px;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      "
    >
      <h2>InputComponent — Demo</h2>

      <section>
        <h3>Sizes</h3>
        <app-input label="Small (s)" placeholder="size s" size="s" />
        <br />
        <app-input label="Medium (m)" placeholder="size m" size="m" />
        <br />
        <app-input label="Large (l)" placeholder="size l" size="l" />
      </section>

      <section>
        <h3>Statuses</h3>
        <app-input label="Default" placeholder="default" />
        <br />
        <app-input
          label="Error"
          placeholder="error"
          status="error"
          errorText="This field is required"
        />
        <br />
        <app-input label="Warning" placeholder="warning" status="warning" hint="Check your input" />
      </section>

      <section>
        <h3>States</h3>
        <app-input label="Disabled" placeholder="disabled" [disabled]="true" />
        <br />
        <app-input label="Readonly" value="Read-only value" [readonlyMode]="true" />
        <br />
        <app-input label="Required" placeholder="required field" [required]="true" />
      </section>

      <section>
        <h3>With hint</h3>
        <app-input
          label="Email"
          placeholder="you@example.com"
          type="email"
          hint="We will never share your email"
        />
      </section>

      <section>
        <h3>With FormControl</h3>
        <app-input label="Reactive form" [formControl]="ctrl" />
        <p>Value: {{ ctrl.value }}</p>
      </section>

      <section>
        <h3>Two-way binding</h3>
        <app-input label="Two-way" [(value)]="twoWayValue" />
        <p>Value: {{ twoWayValue }}</p>
      </section>

      <section>
        <h3>Types</h3>
        <app-input label="Email" placeholder="email" type="email" />
        <br />
        <app-input label="Tel" placeholder="phone" type="tel" />
        <br />
        <app-input label="URL" placeholder="https://" type="url" />
        <br />
        <app-input label="Search" placeholder="search..." type="search" />
      </section>
    </div>
  `,
})
export class InputDemoComponent {
  ctrl = new FormControl('initial value');
  twoWayValue = 'edit me';
}
