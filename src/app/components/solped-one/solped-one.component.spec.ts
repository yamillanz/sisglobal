import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolpedOneComponent } from './solped-one.component';

describe('SolpedOneComponent', () => {
  let component: SolpedOneComponent;
  let fixture: ComponentFixture<SolpedOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolpedOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolpedOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
