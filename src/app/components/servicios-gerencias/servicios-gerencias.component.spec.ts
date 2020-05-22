import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosGerenciasComponent } from './servicios-gerencias.component';

describe('ServiciosGerenciasComponent', () => {
  let component: ServiciosGerenciasComponent;
  let fixture: ComponentFixture<ServiciosGerenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiciosGerenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosGerenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
