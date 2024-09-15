import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ICart } from 'src/app/Shared/Interfaces/icart';
import { CartService } from 'src/app/Shared/Services/cart.service';
import { ProductService } from 'src/app/Shared/Services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: ICart[] = [];
  loading = true;
  total = 0;
  rejectedOrders: { productId: string; colorId: string; sizeId: string, quantity:number }[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserItems();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getUserItems() {
    this.cartService
      .getCartItems()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (items) => {
          this.cartItems = items;
          this.calculateTotal();
          this.loading = false;
        },
        (error) => {
          console.error('Failed to fetch cart items', error);
          this.loading = false;
        }
      );
  }

  onQuantityChange(item: ICart) {
    this.cartService
      .updateItemQuantity(item.quantity, item.id)
      .subscribe(() => {
        this.calculateTotal();
      });
  }

  remove(itemId: number) {
    this.cartService.deleteItem(itemId).subscribe(() => {
      this.cartItems = this.cartItems.filter((item) => item.id !== itemId);
      this.calculateTotal();
    });
  }

  view(productId: number) {
    this.productService.viewDetails(productId);
  }

  calculateTotal() {
    this.total = this.cartItems.reduce(
      (acc, item) => acc + item.productPrice * item.quantity,
      0
    );
  }
  proceedToCheckout() {
    let rejectedOrder: {
      productId: string;
      colorId: string;
      sizeId: string;
      quantity: number;
    }[] = [];

    // Show loading while processing
    this.loading = true;

    this.cartService.getCartItems().subscribe((items) => {
      let pendingRequests = items.length;

      items.forEach((item) => {
        this.productService.getProduct(item.productId).subscribe((product) => {
          let found = false;

          for (let j = 0; j < product.colorsAndSizesAndQuantity.length; j++) {
            const productDetail = product.colorsAndSizesAndQuantity[j];

            if (
              item.colorId === productDetail.colorId &&
              item.sizeId === productDetail.sizeId
            ) {
              if (item.quantity > productDetail.quantity) {
                rejectedOrder.push({
                  productId: product.name,
                  colorId: productDetail.colorName,
                  sizeId: productDetail.sizeName,
                  quantity: productDetail.quantity
                });
              }
              found = true;
              break;
            }
          }

          // Decrease pending request count
          pendingRequests--;

          // Check if all products have been processed
          if (pendingRequests === 0) {
            this.loading = false;

            if (rejectedOrder.length > 0) {
              // Notify user with rejected orders
              this.rejectedOrders = rejectedOrder;
            } else {
              // Navigate to /checkout
              this.router.navigate(['/checkout']);
            }
          }
        });
      });
    });
  }
}
