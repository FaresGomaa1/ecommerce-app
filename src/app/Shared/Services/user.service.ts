import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ILogin, IRegister } from '../Interfaces/iuser';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string = environment.apiUrl + '/User/';
  private jwtHelper = new JwtHelperService();
  private tokenName: string = "authToken";

  constructor(private http: HttpClient) {}

  register(user: IRegister): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'register', user);
  }

  login(credentials: ILogin): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'login', credentials);
  }
  validateToken(): boolean {
    let token = this.getToken();
    if (!token) {
      return false;
    }
    try {
      return !this.jwtHelper.isTokenExpired(token);
    } catch (error) {
      console.error('Error validating token', error);
      return false;
    }
  }
  getToken(): string | null {
    const token = localStorage.getItem(this.tokenName);
    if (token) {
      return token;
    } else {
      return null;
    }
  }
  setToken(token: string){
    localStorage.setItem(this.tokenName, token);
  }
  decodeToken(): any {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    if (this.validateToken()) {
      try {
        return this.jwtHelper.decodeToken(token);
      } catch (error) {
        console.error('Error decoding token', error);
        return null;
      }
    } else {
      return null;
    }
  }
  isAuthenticated(): Observable<boolean> {
    if (this.validateToken()) {
      return of(true);
    } else {
      return of(false);
    }
  }
}
