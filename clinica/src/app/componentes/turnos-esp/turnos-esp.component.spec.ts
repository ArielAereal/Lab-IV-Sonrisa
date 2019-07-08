import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosEspComponent } from './turnos-esp.component';

describe('TurnosEspComponent', () => {
  let component: TurnosEspComponent;
  let fixture: ComponentFixture<TurnosEspComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnosEspComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosEspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
