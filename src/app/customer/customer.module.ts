import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ShopComponent } from './components/shop/shop.component';
import { CartComponent } from './components/cart/cart.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { OrdersComponent } from './components/orders/orders.component';
import { StatusColorDirective } from './directives/status-color.directive';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { GetAddressComponent } from './components/checkout/get-address/get-address.component';


@NgModule({
  declarations: [
    CustomerComponent,
    NavbarComponent,
    FooterComponent,
    LandingPageComponent,
    ShopComponent,
    CartComponent,
    WishListComponent,
    OrdersComponent,
    StatusColorDirective,
    ProductDetailsComponent,
    CheckoutComponent,
    GetAddressComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ]
})
export class CustomerModule { }
