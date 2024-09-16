import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { IFailedOrderItem, IOrderDetailResponse, IOrderDetails } from '../Interfaces/iorder-details';
import { environment } from 'src/environments/environment';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { OrderService } from './order.service';

@Injectable({
  providedIn: 'root',
})
export class OrderDetailsService {
  private baseApi: string = `${environment.apiUrl}/OrderDetails`;

  constructor(
    private sharedService: SharedService,
    private http: HttpClient,
    private router: Router,
    private orderService: OrderService
  ) {}

  // Add order details and handle possible failed items in response
  addOrder(newOrderDetails: IOrderDetails[]): Observable<IOrderDetailResponse> {
    if (!this.sharedService.isAuthenticated()) {
      this.router.navigate(['/auth/sign-in']);
      return EMPTY;
    }

    const headers = this.sharedService.getHeaders();

    return this.http.post<IOrderDetailResponse>(this.baseApi, newOrderDetails, { headers }).pipe(
      map((response: IOrderDetailResponse) => {
        if (response.failedItems?.length > 0) {
          console.warn('Some items could not be processed due to insufficient stock:', response.failedItems);
          this.handleFailedItems(response.failedItems, newOrderDetails[0].orderId);
        } else {
          console.log('Order processed successfully:', response.message);
        }
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        // Check if the error is a 400 status code and contains failed items
        if (error.status === 400 && error.error?.failedItems?.length > 0) {
          const failedItems: IFailedOrderItem[] = error.error.failedItems;
          console.warn('Order failed due to insufficient stock on some items:', failedItems);
          this.handleFailedItems(failedItems, newOrderDetails[0].orderId);
        } else {
          console.error('An unexpected error occurred while adding order details:', error);
          this.handleOrderFailure(newOrderDetails[0].orderId);
        }
        return this.sharedService.handleError(error);
      })
    );
  }

  // Handle failed items by notifying the user or attempting other actions
  private handleFailedItems(failedItems: IFailedOrderItem[], orderId: number): void {
    console.error(`Failed items for order ID ${orderId}:`, failedItems);

    // Optionally delete the order if all items fail, or handle partial failures
    this.orderService.deleteOrder(orderId).subscribe(
      () => console.log(`Order ${orderId} deleted due to failed items.`),
      (error) => console.error('Error deleting order:', error)
    );
  }

  // Handle complete order failure and trigger a rollback
  private handleOrderFailure(orderId: number): void {
    // Attempt to delete the order if adding details fails
    this.orderService.deleteOrder(orderId).subscribe(
      () => console.log(`Order ${orderId} deleted due to failure.`),
      (error) => console.error('Error deleting order:', error)
    );
  }
}
