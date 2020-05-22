import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsEnviadosComponent } from './tickets-enviados.component';

describe('TicketsEnviadosComponent', () => {
  let component: TicketsEnviadosComponent;
  let fixture: ComponentFixture<TicketsEnviadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketsEnviadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsEnviadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
