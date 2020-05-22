import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasGerenciasComponent } from './areas-gerencias.component';

describe('AreasGerenciasComponent', () => {
  let component: AreasGerenciasComponent;
  let fixture: ComponentFixture<AreasGerenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreasGerenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreasGerenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
