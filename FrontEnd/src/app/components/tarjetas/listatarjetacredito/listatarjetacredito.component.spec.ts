import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListatarjetacreditoComponent } from './listatarjetacredito.component';

describe('ListatarjetacreditoComponent', () => {
  let component: ListatarjetacreditoComponent;
  let fixture: ComponentFixture<ListatarjetacreditoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListatarjetacreditoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListatarjetacreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
