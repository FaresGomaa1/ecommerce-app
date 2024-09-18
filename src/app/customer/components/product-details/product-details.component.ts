import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IProductDetails } from 'src/app/Shared/Interfaces/iproduct';
import { CartService } from 'src/app/Shared/Services/cart.service';
import { ProductService } from 'src/app/Shared/Services/product.service';
import { UserService } from 'src/app/Shared/Services/user.service';
import { WishListService } from 'src/app/Shared/Services/wish-list.service';
import { Cart } from 'src/app/Shared/Models/cart';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  stars: number[] = [1, 2, 3, 4, 5];
  product: IProductDetails = {} as IProductDetails;
  availableColorIds: Set<number> = new Set<number>();
  availableSizeIds: Set<number> = new Set<number>();
  availableQuantity: number = 0;
  selectedColorId: number | null = null;
  selectedSizeId: number | null = null;
  selectedQuantity: number = 1;
  productId!: number;
  isItemExist :boolean = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private wishListService: WishListService,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private cartService: CartService
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
        this.onColorChange();
      },
      error: (err) => {
        console.log(err)
        if (err.status === 404) {
          this.router.navigate(['/not-found']);
        } else {
          this.router.navigate(['/server-error']);
        }
      }
    });
  }
  getStars(rating: number): number[] {
    const validRating = Math.max(0, Math.ceil(rating) || 0);
    return Array(validRating).fill(0).map((_, i) => i + 1);
  }

  onColorChange(): void {
    this.availableColorIds.clear();
    this.product.colorsAndSizesAndQuantity.forEach(item => {
      this.availableColorIds.add(item.colorId);
    });
  
    this.onSizeChange(); 
  }
  onSizeChange(): void {
    if (this.availableColorIds.size === 1) {
      this.selectedColorId = Array.from(this.availableColorIds)[0];
    }
    if (this.selectedColorId === null) return;

    this.availableSizeIds.clear();
    this.product.colorsAndSizesAndQuantity
      .filter(item => item.colorId == this.selectedColorId)
      .forEach(item => {
        this.availableSizeIds.add(item.sizeId);
      });
  
    this.onQuantityChange();
  }
  onQuantityChange(): void {
    if (this.availableSizeIds.size === 1) {
      this.selectedSizeId = Array.from(this.availableSizeIds)[0];
    }
  
    if (this.availableColorIds.size === 1) {
      this.selectedColorId = Array.from(this.availableColorIds)[0];
    }
    if (this.selectedColorId === null || this.selectedSizeId === null) return;
  
    const matchingItem = this.product.colorsAndSizesAndQuantity.find(item =>
      item.colorId == this.selectedColorId && item.sizeId == this.selectedSizeId
    );
    this.availableQuantity = matchingItem ? matchingItem.quantity : 0;
  }
  getColorName(colorId: number): string {
    const color = this.product.colorsAndSizesAndQuantity.find(c => c.colorId === colorId);
    return color ? color.colorName : 'Unknown Color';
  }
  
  // Method to get the size name based on sizeId
  getSizeName(sizeId: number): string {
    const size = this.product.colorsAndSizesAndQuantity.find(s => s.sizeId === sizeId);
    return size ? size.sizeName : 'Unknown Size'; 
  }
  isDataValid(): boolean {
    return this.availableQuantity >= this.selectedQuantity;
  }
  addToCart() {
    try {
      // Validate input fields before proceeding
      const colorId = Number(this.selectedColorId);
      const sizeId = Number(this.selectedSizeId);
      const quantity = Number(this.selectedQuantity);
      const productId = Number(this.product?.id);
      
      if (isNaN(colorId) || isNaN(sizeId) || isNaN(quantity) || isNaN(productId)) {
        throw new Error("Invalid input values. Please select valid options.");
      }
      
      if (quantity <= 0) {
        throw new Error("Quantity must be greater than zero.");
      }
  
      // Create the new Cart item
      const newItem = new Cart(
        "",  // assuming this is a placeholder value
        colorId,
        sizeId,
        quantity,
        productId
      );
      
      
      // Attempt to add item to cart using cart service
      this.cartService.addToItemToCart(newItem).subscribe({
        next: () => {
          // Handle success (show notification, etc.)
          console.log("Item successfully added to cart:", newItem);
          alert("Item added to cart successfully!");
        },
        error: (err) => {
          // Handle any errors
          console.log( err);
          alert(`Failed to add item to cart: ${err.message}`);
        }
      });
  
    } catch (error: any) {
      console.error("Error during addToCart operation:", error.message);
      alert(error.message);
    }
  }
  
  
}
