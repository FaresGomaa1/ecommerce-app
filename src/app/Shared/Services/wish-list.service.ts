import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, EMPTY, map, Observable, throwError } from 'rxjs';
import { IWishList, IWishListGet } from '../Interfaces/iwish-list';
import { environment } from 'src/environments/environment';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  private api: string = `${environment.apiUrl}/WishList`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private sharedService: SharedService
  ) {}

  private getHeaders(): HttpHeaders {
    return this.sharedService.getHeaders();
  }

  private getUserId(): string {
    return this.sharedService.getUserIdFromToken();
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 409 && error.error === 'Item already exists in the wishlist.') {
      return throwError(() => new Error('Item already exists in the wishlist.'));
    }
    return this.sharedService.handleError(error);
  }

  addItemToWishList(itemId: number): Observable<IWishList> {
    if (!this.sharedService.isAuthenticated()) {
      this.router.navigate(['/auth/sign-in']);
      return EMPTY;
    }

    const wishListItem: IWishList = {
      userId: this.getUserId(),
      productId: itemId,
    };

    return this.http.post<IWishList>(this.api, wishListItem, { headers: this.getHeaders() }).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  getWishListItems(): Observable<IWishListGet[]> {
    const url = `${this.api}?userId=${this.getUserId()}`;
    return this.http.get<IWishListGet[]>(url, { headers: this.getHeaders() })
  }

  deleteWishListItem(itemId: number): Observable<void> {
    if (!this.sharedService.isAuthenticated()) {
      this.router.navigate(['/auth/sign-in']);
      return EMPTY;
    }

    const url = `${this.api}/${itemId}?userId=${this.getUserId()}`;
    return this.http.delete<void>(url, { headers: this.getHeaders() }).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }

  checkIfItemExists(itemId: number): Observable<boolean> {
    if (!this.sharedService.isAuthenticated()) {
      this.router.navigate(['/auth/sign-in']);
      return EMPTY;
    }

    const url = `${this.api}/check-exists?productId=${itemId}&userId=${this.getUserId()}`;
    return this.http.get<boolean>(url, { headers: this.getHeaders() });
  }

  deleteByUserIdProductId(itemId: number): Observable<void> {
    if (!this.sharedService.isAuthenticated()) {
      this.router.navigate(['/auth/sign-in']);
      return EMPTY;
    }

    const url = `${this.api}?productId=${itemId}&userId=${this.getUserId()}`;
    return this.http.delete<void>(url, { headers: this.getHeaders() }).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error))
    );
  }
  getWishListLength(): Observable<number> {
    const headers = this.sharedService.getHeaders();
    const url = `${this.api}?userId=${this.getUserId()}`;
  
    return this.http.get<IWishListGet[]>(url, { headers }).pipe(
      map(wishListItems => wishListItems.length)
    );
  }
}