import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaMComponent } from './alta-m.component';

describe('AltaMComponent', () => {
  let component: AltaMComponent;
  let fixture: ComponentFixture<AltaMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
