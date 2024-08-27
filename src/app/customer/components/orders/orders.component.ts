import { Component } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  pendingOrders = [
    { invoiceNumber: 'INV001', date: new Date() },
    { invoiceNumber: 'INV002', date: new Date() }
  ];

  deliveredOrders = [
    { invoiceNumber: 'INV003', date: new Date() },
    { invoiceNumber: 'INV004', date: new Date() }
  ];

  rejectedOrders = [
    { invoiceNumber: 'INV005', date: new Date() },
    { invoiceNumber: 'INV006', date: new Date() }
  ];

  viewDetails(order: any): void {
    console.log('Viewing details for order:', order);
  }
}
