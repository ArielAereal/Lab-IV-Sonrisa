import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolverInicioComponent } from './volver-inicio.component';

describe('VolverInicioComponent', () => {
  let component: VolverInicioComponent;
  let fixture: ComponentFixture<VolverInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolverInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolverInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
