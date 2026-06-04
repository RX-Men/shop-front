import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router'; // Импортируем провайдер
import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundComponent], // Если компонент standalone
      providers: [
        provideRouter([]), // Инициализируем окружение роутера
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
