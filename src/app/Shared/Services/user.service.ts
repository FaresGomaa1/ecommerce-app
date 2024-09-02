import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ILogin, IRegister } from '../Interfaces/iuser';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = environment.apiUrl + '/User/';

  constructor(private http: HttpClient) { }

  register(user: IRegister):Observable<any> {
    return this.http.post<any>(this.baseUrl + 'register', user)
  }

  login(credentials: ILogin) :Observable<any> {
    return this.http.post<any>(this.baseUrl + 'login', credentials)
  }
}