import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarUComponent } from './listar-u.component';

describe('ListarUComponent', () => {
  let component: ListarUComponent;
  let fixture: ComponentFixture<ListarUComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarUComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
