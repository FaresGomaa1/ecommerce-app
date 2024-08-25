import { Component } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {
  categories = [
    { id: 'electronics', name: 'Electronics', selected: false },
    { id: 'clothing', name: 'Clothing', selected: false },
    { id: 'homeKitchen', name: 'Home & Kitchen', selected: false }
    // Add more categories as needed
  ];

  ratings = [
    { id: 'fiveStars', stars: 5, selected: false },
    { id: 'fourStars', stars: 4, selected: false },
    { id: 'threeStars', stars: 3, selected: false },
    { id: 'twoStars', stars: 2, selected: false },
    { id: 'oneStar', stars: 1, selected: false }
    // Add more ratings as needed
  ];

  minPrice: number = 0;
  maxPrice: number = 0;

  onSubmit() {
    // Handle form submission logic here
    console.log('Filters applied:', {
      categories: this.categories.filter(c => c.selected),
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      ratings: this.ratings.filter(r => r.selected)
    });
  }
}
