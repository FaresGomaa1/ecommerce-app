import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAddress } from 'src/app/Shared/Interfaces/iaddress';
import { ICart } from 'src/app/Shared/Interfaces/icart';
import { IOrderAdd } from 'src/app/Shared/Interfaces/iorder';
import { IOrderDetails } from 'src/app/Shared/Interfaces/iorder-details';
import { OrderDetails } from 'src/app/Shared/Models/orderDetails';
import { AddressService } from 'src/app/Shared/Services/address.service';
import { CartService } from 'src/app/Shared/Services/cart.service';
import { OrderDetailsService } from 'src/app/Shared/Services/order-details.service';
import { OrderService } from 'src/app/Shared/Services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  orderItems: ICart[] = [];
  modifiedArray: { item: ICart; total: number }[] = [];
  orderTotal: number = 0;
  shippingAddresses: IAddress[] = [];
  selectedAddress: IAddress | null = null;

  constructor(
    private cartService: CartService,
    private addressService: AddressService,
    private orderService: OrderService,
    private orderDetailsService: OrderDetailsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getCartItems();
    this.getUserAddress();
  }

  getCartItems(): void {
    this.cartService.getCartItems().subscribe((items) => {
      this.orderItems = items;
      this.populateModifiedArray();
    });
  }

  populateModifiedArray(): void {
    this.modifiedArray = [];
    this.orderTotal = 0;

    this.orderItems.forEach((item) => {
      const total = item.productPrice * item.quantity;
      this.orderTotal += total;
      this.modifiedArray.push({ item, total });
    });
  }

  getUserAddress(): void {
    this.addressService.getUserAddress().subscribe((addresses) => {
      this.shippingAddresses = addresses;
    });
  }

  placeOrder(): void {
    if (!this.selectedAddress) {
      console.error('No address selected. Please select an address before placing an order.');
      return;
    }
    const newOrder: IOrderAdd = {
      invoiceNumber: '',
      addressId: this.selectedAddress.id,
      userId: ''
    };
  
    // Call the addOrder method and handle the response
    console.log(newOrder);
    this.orderService.addOrder(newOrder).subscribe({
      next: (order) => {
        console.log('Order successfully created with ID:', order.id);
        this.addOrderDetails(order.id);
      },
      error: (error) => {
        console.log(error);
        // Optional: Show user feedback, retry logic, etc.
      },
    });
  }
  
  addOrderDetails(orderId: number): void {
    if (!orderId) {
      console.error('Invalid order ID. Cannot add order details.');
      return;
    }
  
    const orderDetails: IOrderDetails[] = this.modifiedArray.map(item => {
      return new OrderDetails(
        item.item.productName,
        item.item.color,
        item.item.size,
        item.item.productPrice,
        orderId,
        item.item.productId,
        item.item.colorId,
        item.item.sizeId,
        item.item.quantity
      );
    });
  
    this.orderDetailsService.addOrder(orderDetails).subscribe({
      next: (response) => {
        this.cartService.clearCart().subscribe({
          next: () => {
            this.router.navigate(['/order']);
          },
          error: (error) => {
            this.router.navigate(['/server-error']);
          }
        });
      },
      error: (error) => {
        this.router.navigate(['/server-error']);
      }
    });
    
  }
  
}
