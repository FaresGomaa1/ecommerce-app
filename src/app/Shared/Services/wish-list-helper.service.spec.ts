import { TestBed } from '@angular/core/testing';

import { WishListHelperService } from './wish-list-helper.service';

describe('WishListHelperService', () => {
  let service: WishListHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WishListHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
