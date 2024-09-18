import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Shared/Services/cart.service';
import { UserService } from 'src/app/Shared/Services/user.service';
import { WishListService } from 'src/app/Shared/Services/wish-list.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  cartLength: string = '';
  wishListLength: string = '';

  constructor(
    private userService: UserService,
    private cartService: CartService,
    private wishListService: WishListService
  ) {}

  ngOnInit(): void {
    this.checkLoginStatus();
    this.getCartLength();
    this.getWishListLength();
  }

  private checkLoginStatus(): void {
    // Get token (if needed for other operations) and check if it is valid
    const token = this.userService.getToken();
    this.isLoggedIn = this.userService.validateToken();
  }

  logOut(): void {
    // Clear the token and other session-related data
    localStorage.removeItem('authToken');
    this.isLoggedIn = false;
    // Optionally reload the page or redirect to login page
    window.location.reload();
  }

  getCartLength(): void {
    this.cartService.getCartLength().subscribe((length: number) => {
      if(length > 9){
        this.cartLength = "+9"
      }else {
        this.cartLength = `${length}`;
      }
      
    });
  }
  getWishListLength(){
    this.wishListService.getWishListLength().subscribe((length: number) => {
      if(length > 9){
        this.wishListLength = "+9"
      }else {
        this.wishListLength = `${length}`;
      }
    });
  }
}
