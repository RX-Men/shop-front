import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { LogoDemoComponent } from './logo-demo.component';

describe('LogoDemoComponent', () => {
  let component: LogoDemoComponent;
  let fixture: ComponentFixture<LogoDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoDemoComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoDemoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
