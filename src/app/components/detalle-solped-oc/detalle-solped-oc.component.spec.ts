import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleSolpedOcComponent } from './detalle-solped-oc.component';

describe('DetalleSolpedOcComponent', () => {
  let component: DetalleSolpedOcComponent;
  let fixture: ComponentFixture<DetalleSolpedOcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleSolpedOcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleSolpedOcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
