import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router'; // Импортируем провайдер
import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent], // или в declarations, если компонент не standalone
      providers: [
        provideRouter([]), // Добавляем пустой массив маршрутов для тестов
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
