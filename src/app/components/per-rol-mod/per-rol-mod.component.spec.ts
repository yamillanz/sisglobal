import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerRolModComponent } from './per-rol-mod.component';

describe('PerRolModComponent', () => {
  let component: PerRolModComponent;
  let fixture: ComponentFixture<PerRolModComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerRolModComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerRolModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
