import { Component } from '@angular/core';
import { IWishListGet } from 'src/app/Shared/Interfaces/iwish-list';
import { ProductService } from 'src/app/Shared/Services/product.service';
import { WishListService } from 'src/app/Shared/Services/wish-list.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent {

  wishlistItems: IWishListGet[] = [];
  isLoading: boolean = false; 
  errorMessage: string = '';  

  constructor(
    private wishListService: WishListService,
    private productService: ProductService
  ) {
    this.getAllWishListItems();
  }

  // Fetch all wishlist items
  getAllWishListItems(): void {
    this.isLoading = true;  // Start loading
    this.wishListService.getWishListItems().subscribe({
      next: (items) => {
        this.wishlistItems = items;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load wishlist items.';
        console.error('Error fetching wishlist items:', error);
        this.isLoading = false;
      }
    });
  }

  // Remove an item from the wishlist
  removeFromWishlist(itemId: number): void {
    if (confirm('Are you sure you want to remove this item from your wishlist?')) {
      this.isLoading = true;
      this.wishListService.deleteByUserIdProductId(itemId).subscribe({
        next: () => {
          this.wishlistItems = this.wishlistItems.filter(item => item.id !== itemId);
          this.isLoading = false;
          alert('Item successfully removed from wishlist!');
          window.location.reload()
        },
        error: (error) => {
          this.errorMessage = 'Failed to remove item from wishlist.';
          console.error('Error removing item from wishlist:', error);
          this.isLoading = false;
          window.location.reload()
        }
      });
    }
  }

  // View details of a product
  viewDetails(itemId: number): void {
    this.productService.viewDetails(itemId);
  }
  clearWishlist() {
    throw new Error('Method not implemented.');
    }
}