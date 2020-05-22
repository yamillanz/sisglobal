import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FasesSolpedComponent } from './fases-solped.component';

describe('FasesSolpedComponent', () => {
  let component: FasesSolpedComponent;
  let fixture: ComponentFixture<FasesSolpedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FasesSolpedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FasesSolpedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
