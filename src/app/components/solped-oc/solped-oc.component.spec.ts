import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolpedOCComponent } from './solped-oc.component';

describe('SolpedOCComponent', () => {
  let component: SolpedOCComponent;
  let fixture: ComponentFixture<SolpedOCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolpedOCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolpedOCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
