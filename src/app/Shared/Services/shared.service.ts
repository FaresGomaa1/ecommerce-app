import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  // Get userId from token
  getUserIdFromToken(): string {
    const tokenData = this.userService.decodeToken();
    return tokenData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] || '';
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const tokenValid = this.userService.validateToken();
    return tokenValid;
  }

  // Get HTTP headers with Authorization
  getHeaders(): HttpHeaders {
    const token = this.userService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  // Error handling
  handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error)
    switch (error.status) {
      case 400:
        return throwError(() => new Error(error.error.message));
      case 404:
        this.router.navigate(['/not-found']);
        return EMPTY;
      default:
        this.router.navigate(['/server-error']);
        return EMPTY;
    }
  }
}
