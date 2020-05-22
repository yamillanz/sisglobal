import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FtAlmacenProductoComponent } from './ft-almacen-producto.component';

describe('FtAlmacenProductoComponent', () => {
  let component: FtAlmacenProductoComponent;
  let fixture: ComponentFixture<FtAlmacenProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FtAlmacenProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FtAlmacenProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
