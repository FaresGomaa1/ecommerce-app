import { Component } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  stars: number[] = [1, 2, 3, 4, 5];
  stockStatus: string = 'In Stock'; // Possible values: 'In Stock', 'Out of Stock', 'Last Piece'
  hasRated: boolean = false;

  getStockClass(stockStatus: string) {
    switch (stockStatus) {
      case 'In Stock':
        return 'in-stock';
      case 'Out of Stock':
        return 'out-of-stock';
      case 'Last Piece':
        return 'last-piece';
      default:
        return '';
    }
  }

  addToCart() {
    // Logic to add the product to the cart
    console.log('Added to cart');
  }

  addToWishlist() {
    // Logic to add the product to the wishlist
    console.log('Added to wishlist');
  }

  rateProduct(rating: number) {
    // Logic to submit the rating
    this.hasRated = true;
    console.log(`Product rated with ${rating} stars`);
  }
}
