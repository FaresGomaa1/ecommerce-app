import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable} from 'rxjs';
import { IWishList } from 'src/app/Shared/Interfaces/iwish-list';
import { WishListService } from 'src/app/Shared/Services/wish-list.service';

@Injectable({
  providedIn: 'root',
})
export class WishListHelperService {
  constructor(
    private wishListService: WishListService,
    private snackBar: MatSnackBar
  ) {}

  addItemToWishList(itemId: number): Observable<void> {
    const wishListItem: IWishList = {
      productId: itemId,
      userId: "",
    };

    return new Observable((observer) => {
      this.wishListService.addItemToWishList(wishListItem).subscribe({
        next: (response) => {
          this.snackBar.open('Item added to wish list', 'Close', {
            duration: 6000,
            verticalPosition: 'bottom',
            panelClass: ['snack-success'],
          });
          observer.next();
          observer.complete();
        },
        error: (error) => {
          console.log(error);
          if (error.ok === false && error.status === 409 && error.error === "Item already exists in the wishlist.") {
            this.snackBar.open(error.error, 'Close', {
              duration: 6000,
              verticalPosition: 'bottom',
              panelClass: ['snack-error'],
            });
          }
          observer.error(error);
        },
      });
    });
    
  }
}
