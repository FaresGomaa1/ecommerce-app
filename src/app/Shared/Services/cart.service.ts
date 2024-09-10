import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICartAdd } from '../Interfaces/icart';
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
}
