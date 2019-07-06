import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleUComponent } from './detalle-u.component';

describe('DetalleUComponent', () => {
  let component: DetalleUComponent;
  let fixture: ComponentFixture<DetalleUComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleUComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
