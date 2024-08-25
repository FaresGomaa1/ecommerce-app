import { Component } from '@angular/core';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent {
  wishlistItems = [
    { productName: 'Product 1', price: 29.99, status: 'In Stock' },
    { productName: 'Product 2', price: 49.99, status: 'Out of Stock' },
    { productName: 'Product 3', price: 99.99, status: 'Last Piece' }
  ];

  viewDetails(item: any) {
    // Implement view details functionality
    console.log('View details for', item);
  }

  addToCart(item: any) {
    // Implement add to cart functionality
    console.log('Add to cart', item);
  }

  removeFromWishlist(item: any) {
    // Implement remove from wishlist functionality
    console.log('Remove from wishlist', item);
  }
}
