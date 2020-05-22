import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleSolpedComponent } from './detalle-solped.component';

describe('DetalleSolpedComponent', () => {
  let component: DetalleSolpedComponent;
  let fixture: ComponentFixture<DetalleSolpedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleSolpedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleSolpedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
