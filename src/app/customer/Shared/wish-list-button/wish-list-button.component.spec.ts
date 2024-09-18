import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishListButtonComponent } from './wish-list-button.component';

describe('WishListButtonComponent', () => {
  let component: WishListButtonComponent;
  let fixture: ComponentFixture<WishListButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WishListButtonComponent]
    });
    fixture = TestBed.createComponent(WishListButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
