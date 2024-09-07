import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProductDetails } from 'src/app/Shared/Interfaces/iproduct';
import { ProductService } from 'src/app/Shared/Services/product.service';
import { WishListHelperService } from 'src/app/Shared/Services/wish-list-helper.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  stars: number[] = [1, 2, 3, 4, 5];
  product: IProductDetails = {} as IProductDetails
  productId!: number;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private wishListHelperService: WishListHelperService
  ) {}


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.productId = +id;
        this.getProduct();
      }
    });
  }
  getProduct(): void {
    this.productService.getProduct(this.productId).subscribe({
      next: (product) => {
        this.product = product;
      },
      error: (err) => {
        if (err.status === 404) {
          this.router.navigate(['/not-found']);
        } else {
          this.router.navigate(['/server-error']);
        }
      }      
    });
  }
  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0).map((_, i) => i + 1);
  }
  addItemToWishList(itemId: number): void {
    this.wishListHelperService.addItemToWishList(itemId).subscribe({
      next: () => {},
      error: (error) => {
        console.log(error);
      },
    });
  }
  
}
