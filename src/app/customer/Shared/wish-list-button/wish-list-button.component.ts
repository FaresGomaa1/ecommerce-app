import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UserService } from 'src/app/Shared/Services/user.service';
import { WishListService } from 'src/app/Shared/Services/wish-list.service';

@Component({
  selector: 'app-wish-list-button',
  templateUrl: './wish-list-button.component.html',
  styleUrls: ['./wish-list-button.component.scss']
})
export class WishListButtonComponent implements OnChanges {
  @Input() productId: number = 0;
  isItemExist: boolean = false;
  isLoading: boolean = true; // Loading flag

  constructor(
    private userService: UserService,
    private wishListService: WishListService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['productId'] && this.productId) {
      this.checkItemExist(this.productId);
    }
  }

  checkItemExist(itemId: number) {
    this.isLoading = true;
    if (!this.userService.validateToken()) {
      this.isItemExist = false;
      this.isLoading = false;
      return;
    }

    this.wishListService.checkIfItemExists(itemId).subscribe({
      next: (exists: boolean) => {
        this.isItemExist = exists;
        this.isLoading = false; // Data loading complete
      },
      error: (err) => {
        console.log("Error", err);
        this.isItemExist = false;
        this.isLoading = false; // Data loading complete even in case of error
      }
    });
  }

  addToWishlist() {
    this.wishListService.addItemToWishList(this.productId).subscribe({
      next: () => {
        this.isItemExist = true;
      },
      error: (error) => {
        if (error.message === "This product is already in the user's wishlist.") {
          alert(error.message);
        } else {
          this.isItemExist = false;
          alert('An error occurred. Please try again.');
        }
      }
    });
  }

  removeFromWishlist() {
    this.wishListService.deleteByUserIdProductId(this.productId).subscribe({
      next: () => {
        this.isItemExist = false;
      },
      error: (error) => {
        this.checkItemExist(this.productId);
      }
    });
  }
}
