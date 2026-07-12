import { ComponentFixture, TestBed } from '@angular/core/testing';

import { COMMERCE_TOOLS_MOCK_PROVIDERS } from '@/app/core/services/commercetools/commercetools.service.mock';

import { SearchWidgetComponent } from './search-widget.component';

describe('SearchWidgetComponent', () => {
  let component: SearchWidgetComponent;
  let fixture: ComponentFixture<SearchWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchWidgetComponent],
      providers: [...COMMERCE_TOOLS_MOCK_PROVIDERS],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchWidgetComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
