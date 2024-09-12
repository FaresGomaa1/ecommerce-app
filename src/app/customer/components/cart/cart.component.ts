import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ICart } from 'src/app/Shared/Interfaces/icart';
import { CartService } from 'src/app/Shared/Services/cart.service';
import { ProductService } from 'src/app/Shared/Services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: ICart[] = [];
  loading = true;
  total = 0;
  private destroy$ = new Subject<void>();

  constructor(
    private cartService: CartService,
    private productService: ProductService
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
    this.cartService.updateItemQuantity(item.quantity, item.id).subscribe(() => {
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
}
