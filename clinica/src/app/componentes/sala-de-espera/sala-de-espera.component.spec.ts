import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaDeEsperaComponent } from './sala-de-espera.component';

describe('SalaDeEsperaComponent', () => {
  let component: SalaDeEsperaComponent;
  let fixture: ComponentFixture<SalaDeEsperaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaDeEsperaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaDeEsperaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
