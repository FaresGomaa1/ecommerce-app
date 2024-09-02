import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveredOrderComponent } from './delivered-orders.component';

describe('DeliveredOrderComponent', () => {
  let component: DeliveredOrderComponent;
  let fixture: ComponentFixture<DeliveredOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliveredOrderComponent]
    });
    fixture = TestBed.createComponent(DeliveredOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
