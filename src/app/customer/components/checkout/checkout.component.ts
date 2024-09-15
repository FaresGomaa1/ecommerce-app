import { Component, OnInit } from '@angular/core';
import { IAddress } from 'src/app/Shared/Interfaces/iaddress';
import { ICart } from 'src/app/Shared/Interfaces/icart';
import { AddressService } from 'src/app/Shared/Services/address.service';
import { CartService } from 'src/app/Shared/Services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  orderItems: ICart[] = [];
  modifiedArray: { item: ICart, total: number }[] = [];
  orderTotal: number = 0;
  shippingAddresses: IAddress[] = [];
  selectedAddress: IAddress | null = null;

  constructor(
    private cartService: CartService,
    private addressService: AddressService
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

    this.orderItems.forEach(item => {
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
    if (this.selectedAddress) {
      // Place the order using selected address and order items logic
      console.log('Order placed successfully');
    }
  }
}
