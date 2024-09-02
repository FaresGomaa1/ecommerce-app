import { Component } from '@angular/core';

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.scss','../delivered-orders/delivered-order.component.scss']
})
export class PendingOrdersComponent {
  orders = [
    {
      firstName: 'John',
      lastName: 'Doe',
      shippingAddress: '123 Main St, Springfield, IL',
      orderDate: new Date('2024-08-01'),
      invoiceNumber: 'INV-001234'
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      shippingAddress: '456 Oak St, Metropolis, IL',
      orderDate: new Date('2024-08-02'),
      invoiceNumber: 'INV-001235'
    },
    {
      firstName: 'Robert',
      lastName: 'Johnson',
      shippingAddress: '789 Pine St, Gotham, NY',
      orderDate: new Date('2024-08-03'),
      invoiceNumber: 'INV-001236'
    },
    {
      firstName: 'Emily',
      lastName: 'Davis',
      shippingAddress: '321 Cedar St, Star City, CA',
      orderDate: new Date('2024-08-04'),
      invoiceNumber: 'INV-001237'
    },
    {
      firstName: 'Michael',
      lastName: 'Wilson',
      shippingAddress: '654 Elm St, Central City, MO',
      orderDate: new Date('2024-08-05'),
      invoiceNumber: 'INV-001238'
    },
  ];
}
