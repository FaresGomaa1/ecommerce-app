import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAddress } from 'src/app/Shared/Interfaces/iaddress';
import { IOrder } from 'src/app/Shared/Interfaces/iorder';
import { IOrderDetails } from 'src/app/Shared/Interfaces/iorder-details';
import { AddressService } from 'src/app/Shared/Services/address.service';
import { OrderDetailsService } from 'src/app/Shared/Services/order-details.service';
import { OrderService } from 'src/app/Shared/Services/order.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  orderDetails: IOrderDetails[] = [];
  order: IOrder = {} as IOrder;
  address: IAddress = {} as IAddress;
  orderId: number = 0;

  constructor(
    private orderDetailsService: OrderDetailsService,
    private orderService: OrderService,
    private addressService: AddressService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.orderId = Number(params.get('id'));
      if (this.orderId) {
        this.loadOrderDetails();
        this.loadOrder();
        // console.log(this.orderDetails)
        console.log("Order",this.order)
        // console.log(this.address)
      }
    });
  }

  private loadOrderDetails(): void {
    this.orderDetailsService.getOrderDetails(this.orderId)
      .pipe(catchError(error => {
        console.error('Error fetching order details', error);
        return of([]);
      }))
      .subscribe(orderDetails => {
        this.orderDetails = orderDetails;
      });
  }

  private loadOrder(): void {
    this.orderService.getOrderById(this.orderId)
      .pipe(catchError(error => {
        console.error('Error fetching order', error);
        return of(null);
      }))
      .subscribe(order => {
        if (order) {
          this.order = order;
          console.log("Order",this.order)
          this.loadAddress(order.addressId);
        }
      });
  }

  private loadAddress(addressId: number): void {
    this.addressService.getUserAddress()
      .pipe(catchError(error => {
        console.error('Error fetching addresses', error);
        return of([]);
      }))
      .subscribe(addresses => {
        this.address = addresses.find(addr => addr.id === addressId) || {} as IAddress;
      });
  }
  getTotal(): number {
    return this.orderDetails.reduce((acc, detail) => acc + (detail.quantity * detail.price), 0);
  }  
}
