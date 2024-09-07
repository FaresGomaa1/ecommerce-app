import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IProduct, IProductDetails } from '../Interfaces/iproduct';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private api = `${environment.apiUrl}/Product`;

  constructor(private http: HttpClient, private router: Router) {}

  getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.api}/all`);
  }
  getProduct(productId:number):Observable<IProductDetails>{
    return this.http.get<IProductDetails>(`${this.api}/${productId}`);
  }
  filterByCategory(
    categories: { id: number; name: string; selected: boolean }[],
    products: IProduct[]
  ): IProduct[] {
    const selectedCategories = categories
      .filter(category => category.selected)
      .map(category => category.name.toLowerCase());

    if (selectedCategories.length === 0) return products;

    return products.filter(product =>
      selectedCategories.includes(product.category.toLowerCase())
    );
  }

  filterByPrice(min: number, max: number, products: IProduct[]): IProduct[] {
    if (isNaN(min) || isNaN(max) || min < 0 || max < 0 || min > max) {
      console.warn('Invalid price range');
      return products;
    }

    if (min === 0 && max === 0) return products;

    return products.filter(product =>
      product.price >= min && product.price <= max
    );
  }

  filterByRating(
    ratings: { id: string; stars: number; selected: boolean }[],
    products: IProduct[]
  ): IProduct[] {
    const selectedRatings = ratings
      .filter(rating => rating.selected)
      .map(rating => rating.stars);

    if (selectedRatings.length === 0) return products;

    return products.filter(product =>
      selectedRatings.includes(Math.floor(product.averageRating))
    );
  }

  viewDetails(productId: number): void {
    const url = this.router.createUrlTree(['/product-details', productId]).toString();
    window.open(url, '_blank');
  }
}