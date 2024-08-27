import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAddressComponent } from './get-address.component';

describe('GetAddressComponent', () => {
  let component: GetAddressComponent;
  let fixture: ComponentFixture<GetAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetAddressComponent]
    });
    fixture = TestBed.createComponent(GetAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
