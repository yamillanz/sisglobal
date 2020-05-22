import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadmedidasComponent } from './unidadmedidas.component';

describe('UnidadmedidasComponent', () => {
  let component: UnidadmedidasComponent;
  let fixture: ComponentFixture<UnidadmedidasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadmedidasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadmedidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
