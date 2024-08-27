import { Component, OnInit } from '@angular/core';

interface OrderItem {
  productName: string;
  price: number;
  quantity: number;
  total: number;
}

interface Address {
  id: number;
  fullName: string;
  addressLine1: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  orderItems: OrderItem[] = [
    { productName: 'Product 1', price: 29.99, quantity: 2, total: 59.98 },
    { productName: 'Product 2', price: 19.99, quantity: 1, total: 19.99 },
    // Add more items here
  ];

  shippingAddresses: Address[] = [
    { id: 1, fullName: 'John Doe', addressLine1: '123 Main St', city: 'Springfield', state: 'IL', zipCode: '62701', country: 'USA' },
    { id: 2, fullName: 'Jane Smith', addressLine1: '456 Oak St', city: 'Hometown', state: 'CA', zipCode: '90210', country: 'USA' },
    // Add more addresses here
  ];

  selectedAddress: Address | null = null;

  get orderTotal(): number {
    return this.orderItems.reduce((total, item) => total + item.total, 0);
  }

  ngOnInit(): void {
    // Initialize default selected address if any
    this.selectedAddress = this.shippingAddresses.length ? this.shippingAddresses[0] : null;
  }

  viewDetails(item: OrderItem) {
    // Implement view details functionality
    console.log('View details for:', item);
  }

  placeOrder() {
    if (this.selectedAddress) {
      // Implement place order functionality
      console.log('Order placed with address:', this.selectedAddress);
    } else {
      console.log('Please select a shipping address.');
    }
  }
}
