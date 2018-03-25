import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakasetabelkaComponent } from './takasetabelka.component';

describe('TakasetabelkaComponent', () => {
  let component: TakasetabelkaComponent;
  let fixture: ComponentFixture<TakasetabelkaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakasetabelkaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakasetabelkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
