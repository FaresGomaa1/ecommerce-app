import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Shared/Services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  private checkLoginStatus(): void {
    const token = this.userService.getToken();
    this.isLoggedIn = this.userService.validateToken();
  }

  logOut(): void {
    // Clear the token
    localStorage.removeItem('authToken');
    this.isLoggedIn = false;
    // window.location.reload();
  }
}
