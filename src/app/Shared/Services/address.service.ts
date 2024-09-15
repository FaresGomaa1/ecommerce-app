import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SharedService } from './shared.service';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, EMPTY, Observable, throwError } from 'rxjs';
import { IAddress, IAddressAdd } from '../Interfaces/iaddress';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private baseApi: string = `${environment.apiUrl}/Address`;

  constructor(
    private sharedService: SharedService,
    private router: Router,
    private http: HttpClient
  ) {}

  // Fetch user addresses
  getUserAddress(): Observable<IAddress[]> {
    if (!this.sharedService.isAuthenticated()) {
      this.router.navigate(['/auth/sign-in']);
      return EMPTY;
    }

    const headers = this.sharedService.getHeaders();
    const url = `${this.baseApi}?userId=${this.sharedService.getUserIdFromToken()}`;

    return this.http.get<IAddress[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Add new address
  addNewAddress(newAddress: IAddressAdd): Observable<IAddressAdd> {
    if (!this.sharedService.isAuthenticated()) {
      this.router.navigate(['/auth/sign-in']);
      return EMPTY;
    }

    const headers = this.sharedService.getHeaders();
    const url = `${this.baseApi}?userId=${this.sharedService.getUserIdFromToken()}`;

    return this.http.post<IAddressAdd>(url, newAddress, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Handle errors
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error occurred:', error);
    return throwError(() => new Error('Something went wrong. Please try again.'));
  }
}
