import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, Observable, of, throwError } from 'rxjs';
import { retryWhen, mergeMap, delay, take } from 'rxjs/operators';
import { IOrderAdd, IOrderResponse } from '../Interfaces/iorder';
import { SharedService } from './shared.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl: string = `${environment.apiUrl}/Order`;

  constructor(
    private sharedService: SharedService,
    private http: HttpClient,
    private router: Router
  ) {}

  /**
   * Adds a new order, including invoice number generation and retry logic on conflicts.
   * @param order - The order details to be added.
   * @returns Observable of IOrderResponse
   */
  addOrder(order: IOrderAdd): Observable<IOrderResponse> {
    if (!this.sharedService.isAuthenticated()) {
      this.router.navigate(['/auth/sign-in']);
      return EMPTY;
    }

    // Generate invoice number
    const generateInvoiceNumber = (): string => {
      const datePart = new Date().toISOString().slice(0, 7).replace('-', '');
      const randomNumber = Math.floor(100000 + Math.random() * 900000);
      return `INV-${datePart}-${randomNumber}`;
    };

    // Set initial invoice number and user ID
    order.invoiceNumber = generateInvoiceNumber();
    order.userId = this.sharedService.getUserIdFromToken();
    const headers = this.sharedService.getHeaders();

    return this.http.post<IOrderResponse>(this.baseUrl, order, { headers }).pipe(
      catchError((error: HttpErrorResponse) => this.handleOrderError(error)),
      retryWhen((errors) => this.handleRetry(errors, order, generateInvoiceNumber))
    );
  }

  /**
   * Handles order-specific errors, including conflicts for invoice numbers.
   * @param error - The HttpErrorResponse thrown by the API.
   * @returns Observable of the error or a handled response.
   */
  private handleOrderError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 409) {
      return throwError(() => new Error('Invoice number conflict'));
    }
    return this.sharedService.handleError(error);
  }

  /**
   * Handles retry logic when there is an invoice number conflict.
   * @param errors - Observable of the errors to retry.
   * @param order - The order object to update the invoice number.
   * @param generateInvoiceNumber - Function to generate a new invoice number.
   * @returns Observable of the retried request or error.
   */
  private handleRetry(errors: Observable<any>, order: IOrderAdd, generateInvoiceNumber: () => string): Observable<any> {
    return errors.pipe(
      mergeMap((error, retryCount) => {
        if (retryCount < 3 && error.message === 'Invoice number conflict') {
          order.invoiceNumber = generateInvoiceNumber();
          return of(order).pipe(delay(1000));
        }
        return throwError(error); // Stop retrying after 3 attempts
      }),
      take(3)
    );
  }

  /**
   * Deletes an order by orderId and userId.
   * @param orderId - The ID of the order to delete.
   * @returns Observable of the deletion response.
   */
  deleteOrder(orderId: number): Observable<void> {
    if (!this.sharedService.isAuthenticated()) {
      this.router.navigate(['/auth/sign-in']);
      return EMPTY;
    }

    const headers = this.sharedService.getHeaders();
    const url: string = `${this.baseUrl}/${orderId}?userId=${this.sharedService.getUserIdFromToken()}`;

    return this.http.delete<void>(url, { headers }).pipe(
      catchError((error: HttpErrorResponse) => this.sharedService.handleError(error))
    );
  }
}
