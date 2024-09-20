import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/Shared/Interfaces/iproduct';
import { CategoryService } from 'src/app/Shared/Services/category.service';
import { ProductService } from 'src/app/Shared/Services/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  categories: { id: number; name: string; selected: boolean }[] = [];
  products: IProduct[] = [];
  filterProducts: IProduct[] = [];
  sortWay: string='';
  searchTerm: string = '';
  minPrice: number = 0;
  maxPrice: number = 0;
  message:string = "";
  snackMessage: string = '';
isSuccess: boolean = true;
numberOfPages:number = 0;
currentPage: number = 1;
  // Ratings array is now readonly since it doesn't change dynamically
  readonly ratings = [
    { id: 'fiveStars', stars: 5, selected: false },
    { id: 'fourStars', stars: 4, selected: false },
    { id: 'threeStars', stars: 3, selected: false },
    { id: 'twoStars', stars: 2, selected: false },
    { id: 'oneStar', stars: 1, selected: false },
  ];

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadAllProducts();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        categories.forEach((category) => {
          this.categories.push({
            id: category.id,
            name: category.name,
            selected: false,
          });
        });
      },
      error: (err) => {
        console.error('Error fetching categories', err);
      },
    });
  }
  loadAllProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filterProducts = products;
        // this.pagination(1)
      },
      error: (err) => {
        console.error('Error fetching products', err);
      },
    });
  }
  onSubmit(): void 
  {
    let products:IProduct[] = [];
    this.searchProducts(this.searchTerm, this.products);
    this.sortProducts(this.sortWay, this.filterProducts);
    products = this.productService.filterByCategory(this.categories, this.filterProducts);
    products = this.productService.filterByPrice(this.minPrice, this.maxPrice,products);
    products =this.productService.filterByRating(this.ratings,products);
    this.filterProducts = products;
  }
  searchProducts(productName: string, products: IProduct[]) {
    if (!productName.trim() || productName === '') {
      this.filterProducts = products;
      return;
    }
    const lowerCasedSearch = productName.toLowerCase();
    this.filterProducts = products.filter((product) =>
      product.name.toLowerCase().includes(lowerCasedSearch)
    );
  }
  sortProducts(sortWay: string, products: IProduct[]) {
    this.filterProducts = products;
    switch (sortWay) {
      case 'price-asc':
        this.filterProducts.sort((a, b) => a.price - b.price);
        this.sortWay = 'price-asc';
        break;
      case 'price-desc':
        this.filterProducts.sort((a, b) => b.price - a.price);
        this.sortWay = 'price-desc';
        break;
      case 'rating-asc':
        this.filterProducts.sort((a, b) => a.averageRating - b.averageRating);
        this.sortWay = 'rating-asc';
        break;
      case 'rating-desc':
        this.filterProducts.sort((a, b) => b.averageRating - a.averageRating);
        this.sortWay = 'rating-desc';
        break;
      default:
        this.filterProducts = products;
        break;
    }
    // this.pagination(this.currentPage);
  }
  viewDeails(productId: number){
    this.productService.viewDetails(productId);
  }
  // pagination(pageNumber: number) {
  //   this.currentPage = pageNumber;
  //   let itemPerPage = 4;
  //   this.numberOfPages = Math.ceil(this.products.length / itemPerPage);
  //   let firstIndex = (this.currentPage - 1) * itemPerPage;
  //   let lastIndex = firstIndex + itemPerPage;
  
  //   // Ensure lastIndex does not exceed the length of the array
  //   lastIndex = Math.min(lastIndex, this.products.length);
    
  //   this.filterProducts = this.filterProducts.slice(firstIndex, lastIndex);
  // }
  resetFilters(){
    window.location.reload();
  }
  
}
