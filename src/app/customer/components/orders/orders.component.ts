import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/Shared/Interfaces/iorder';
import { OrderService } from 'src/app/Shared/Services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  pendingOrders: IOrder[] = [];
  rejectedOrders: IOrder[] = [];
  deliveredOrders: IOrder[] = [];

  constructor(private orderService: OrderService,private router: Router) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  private loadOrders(): void {
    this.orderService.getUserOrders().subscribe({
      next: (orders) => this.categorizeOrders(orders),
      error: (err) => console.error('Failed to load orders', err),
    });
  }

  private categorizeOrders(orders: IOrder[]): void {
    console.log(orders);
    orders.forEach(order => {
      switch (order.status) {
        case 'Pending':
          this.pendingOrders.push(order);
          break;
        case 'Rejected':
          this.rejectedOrders.push(order);
          break;
        case 'Delivered':
          this.deliveredOrders.push(order);
          break;
        default:
          console.warn(`Unknown order status: ${order.status}`);
      }
    });
  }
  viewOrderDetails(orderId: number) {
    this.router.navigate([`/order-details/${orderId}`]);
  }
}
