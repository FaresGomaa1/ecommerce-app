import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ShopComponent } from './components/shop/shop.component';
import { CartComponent } from './components/cart/cart.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AuthGuard } from '../Shared/Guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    children: [
      { path: '', redirectTo: 'landing-page', pathMatch: 'full' },
      { path: 'landing-page', component: LandingPageComponent },
      { path: 'shop', component: ShopComponent },
      { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
      { path: 'wish-list', component: WishListComponent, canActivate: [AuthGuard] },
      { path: 'product-details/:id', component: ProductDetailsComponent },
      { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
      { path: 'order', component: OrdersComponent,  canActivate: [AuthGuard] },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
