import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICart, ICartAdd } from '../Interfaces/icart';
import { catchError, EMPTY, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private api: string = `${environment.apiUrl}/Cart`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private sharedService: SharedService
  ) {}

  // Add item to cart
  addToItemToCart(item: ICartAdd): Observable<ICartAdd> {
    if (!this.sharedService.isAuthenticated()) {
      this.router.navigate(['/auth/sign-in']);
      return EMPTY;
    }

    const headers = this.sharedService.getHeaders();
    item.userId = this.sharedService.getUserIdFromToken();

    return this.http.post<ICartAdd>(this.api, item, { headers }).pipe(
      catchError((error: HttpErrorResponse) => this.sharedService.handleError(error))
    );
  }

  // Get cart items
  getCartItems(): Observable<ICart[]> {
    if (!this.sharedService.isAuthenticated()) {
      this.router.navigate(['/auth/sign-in']);
      return EMPTY;
    }

    const headers = this.sharedService.getHeaders();
    const url: string = `${this.api}?userId=${this.sharedService.getUserIdFromToken()}`;

    return this.http.get<ICart[]>(url, { headers })
  }
  deleteItem(itemId: number): Observable<void> {
    const headers = this.sharedService.getHeaders();
    return this.http.delete<void>(`${this.api}/${itemId}`, { headers }).pipe(
      catchError((error: HttpErrorResponse) => this.sharedService.handleError(error))
    );
  }
  updateItemQuantity(quantity: number, itemId: number) {
    const headers = this.sharedService.getHeaders();
    return this.http.patch(`${this.api}?quantity=${quantity}&itemId=${itemId}`, null, { headers }).pipe(
      catchError((error: HttpErrorResponse) => this.sharedService.handleError(error))
    );
  }
  clearCart(){
    if (!this.sharedService.isAuthenticated()) {
      this.router.navigate(['/auth/sign-in']);
      return EMPTY;
    }
    const headers = this.sharedService.getHeaders();
    const url:string = `${this.api}/user/${this.sharedService.getUserIdFromToken()}`
    return this.http.delete<void>(url, { headers }).pipe(
      catchError((error: HttpErrorResponse) => this.sharedService.handleError(error))
    );
  }
}