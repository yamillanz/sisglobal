import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolpedsdetalleComponent } from './solpedsdetalle.component';

describe('SolpedsdetalleComponent', () => {
  let component: SolpedsdetalleComponent;
  let fixture: ComponentFixture<SolpedsdetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolpedsdetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolpedsdetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
