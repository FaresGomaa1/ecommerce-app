import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWishList, IWishListGet } from '../Interfaces/iwish-list';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  private api: string = `${environment.apiUrl}/WishList`;
  private token: string | null;
  private decodedToken: any;
  private userId:string = "";

  constructor(private http: HttpClient, private userService: UserService) {
    this.token = this.userService.getToken();
    this.decodedToken = this.userService.decodeToken();
    this.userId = this.decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
  }

  getWishListItems(): Observable<IWishListGet[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    const url = `${this.api}?userId=${this.userId}`;
    return this.http.get<IWishListGet[]>(url, { headers });
  }

  addItemToWishList(item: IWishList): Observable<IWishList> {
    item.userId = this.userId;
    if (!this.token) {
      throw new Error('No token available');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<IWishList>(`${this.api}`, item, { headers });
  }

  deleteWishListItem(itemId: number): Observable<void> {

    if (!this.token) {
      throw new Error('No token available');
    }

    // Set up headers with Bearer token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    // Make DELETE request to remove the item from wishlist
    const url = `${this.api}/${itemId}?userId=${this.userId}`;
    return this.http.delete<void>(url, { headers });
  }
}