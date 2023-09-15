import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetacreditoComponent } from './tarjetacredito.component';

describe('TarjetacreditoComponent', () => {
  let component: TarjetacreditoComponent;
  let fixture: ComponentFixture<TarjetacreditoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarjetacreditoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetacreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
